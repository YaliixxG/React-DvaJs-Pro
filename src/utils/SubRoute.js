import React from 'react';
import { Route, Redirect } from 'dva/router';
import NoMatch from '../components/NoMatch';
import dynamic from 'dva/dynamic';
import { connect } from 'dva'

//dva 解决加载动态路由组件
const dynamicComp = (app, models, component, routes, isAuthority, userInfo) =>
  dynamic({
    //dva实例，加载Models时需要
    app,

    //返回Promise数组的函数，Promise返回dva model
    models: () => models,

    //返回Promise的函数，Promise返回React Component
    component:() => 
    component().then(res => {
      
      //如果isAuthority不为true,并且用户信息无内容 则直接跳转到登录页
      if(isAuthority){
        if(!userInfo.id){
          return () => <Redirect to="/login" />
        }       
      }
        const Component = res.default || res;
        return props => <Component {...props} app={app} routes={routes} />;
      })
  });

function SubRoute({ routes, component, app, model, isAuthority, userInfo}) {
  return <Route component={dynamicComp(app, model, component, routes, isAuthority, userInfo)} />;
}

// export default function SubRoute({routes,component:Component}) {
//   return <Route render = {(props) => <Component {...props} routes={routes} />} />
// }

//重定向路由封装组件
export function RedirectRoute({ routes, from, exact }) {
  //filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
  const routeR = routes.filter(item => {
    return item.redirect;
  });

  const to = routeR.length ? routeR[0].path : routes[0].path;
  return <Redirect exact={exact} from={from} to={to} />;
}

//不匹配路由封装组件
export function NoMatchRoute({ status = 404 }) {
  return <Route render={props => <NoMatch {...props} status={status} />} />;
}

//链接 SubRoute 与 global 的状态
export default connect(({global}) => ({
  userInfo:global.userInfo
}))(SubRoute);
