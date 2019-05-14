import React, { Component } from 'react';
import style from './index.scss';
import { Switch } from 'dva/router';
import { Tabs } from 'antd';
import Subroute, { RedirectRoute } from '../../utils/SubRoute';

//结构
const { TabPane } = Tabs;

export default class index extends Component {
  //点击路由进行切换
  handleChangeTab = key => {
    //console.log(key)
    // window.location.href = '/#' +   key
    // console.log(this)
    //打印this，可以发现自带的方法 this.props.history.push()
    //在点击相同的路劲时会出现警告，此时用这个来判断一下即可，路劲不同时再跳转
    if (this.props.location.pathname !== key) {
      this.props.history.push(key);
    }
  };

  render() {
    const { routes, app } = this.props;
    return (
      <div className={style.about}>
        <Tabs
          className={style.tabs}
          tabPosition={'left'}
          activeKey={this.props.location.pathname} //聚焦到正确的路劲
          onChange={this.handleChangeTab}
        >
          <TabPane tab="历史订餐" key="/about/history" />
          <TabPane tab="联系我们" key="/about/contact" />
          <TabPane tab="点餐文档" key="/about/ordering" />
          <TabPane tab="快递信息" key="/about/address" />
        </Tabs>
        <div className={style.routes}>
          <Switch>
            {routes.map((route, i) => (
              <Subroute {...route} key={i} app={app}/>
            ))}
            <RedirectRoute exact={true} from={'/about'} routes={routes} />
          </Switch>
        </div>
      </div>
    );
  }
}
