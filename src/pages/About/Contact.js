import React, { Component } from 'react'
import { Switch, Link } from 'dva/router'
import Subroute, { RedirectRoute } from '../../utils/SubRoute'
import styles from './contact.scss'

export default class Contact extends Component {
  render() {
    const { routes, app} = this.props
    return (
      <div className={styles.tabpane}>
          <p className={styles.title}>联系我们</p>
          <div className={styles.content}>
          <Link to='/about/contact/phone'>电话</Link>
          <Link to='/about/contact/contactAddr'>地址</Link>
          </div>
          <div className={styles.info}>
            {/* 三级路由 */}
            <Switch>
            {routes.map((route, i) => (
              <Subroute {...route} key={i} app={app}/>
            ))}
            <RedirectRoute exact={true} from={'/about/contact'} routes={routes} />
          </Switch>
          </div>
        </div>
    )
  }
}
