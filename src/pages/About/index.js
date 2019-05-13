import React, { Component } from 'react';
import style from './index.scss';
import { Switch } from 'dva/router';
import { Tabs } from 'antd';
import Subroute, { RedirectRoute } from '../../utils/SubRoute'

//结构
const { TabPane } = Tabs;

export default class index extends Component {
  render() {
    const { routes, app } = this.props
    return (
      <div className={style.about}>
        <Tabs className={style.tabs} tabPosition={'left'}>
          <TabPane tab="历史订餐" key="历史订餐" />
          <TabPane tab="联系我们" key="联系我们" />
          <TabPane tab="点餐文档" key="点餐文档" />
          <TabPane tab="快递信息" key="快递信息" />
        </Tabs>
        <div className={style.routes}>
          <Switch>
            {routes.map((route, i) => (
              <Subroute {...route} key={i} />
            ))}
            <RedirectRoute exact={true} from={'/about'} routes={routes} />
          </Switch>
        </div>
      </div>
    );
  }
}
