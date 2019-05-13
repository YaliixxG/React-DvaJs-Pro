import React from 'react';
import { connect } from 'dva';
import { Switch } from 'dva/router';
import styles from './IndexPage.scss';
import { Layout } from 'antd';
import NavBar from './NavBar';
import SubRoute, { RedirectRoute, NoMatchRoute } from '../utils/SubRoute';
// import Home from './Home'
// import Menus from './Menus'
// import Admin from './Admin'
// import About from './About'
// import Login from './User/login'
// import Register from './User/register'

const { Header, Content } = Layout;

function IndexPage(props) {
  const { routes } = props;

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar {...props} />
      </Header>
      <Content className={styles.content}>
        <Switch>
          {/* <Route path="/home" component={Home} />
           <Route path="/menus" component={Menus} />
           <Route path="/admin" component={Admin} />
           <Route path="/about" component={About} />
           <Route path="/Login" component={Login} />
           <Route path="/Regist" component={Register} /> */}
          {routes.map((route, i) => (
            <SubRoute key={i} {...route} />
          ))}
          {/* 重定向方式：
         如果路由配置没有redirect：true（通过循环渲染重定向）
         则默认第一个路由为重定向路由
         <Redirect exact from={'/'} to='/home' /> */}
          {/* 封装重定向路由 */}
          <RedirectRoute exact={true} from={'/'} routes={routes} />
          {/* 当输入路劲不存在时，封装一个NoMatch路由 */}
          <NoMatchRoute />
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
