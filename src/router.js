import React from 'react';
import { Router, Switch } from 'dva/router';
// import IndexPage from './pages/IndexPage'
// import Home from './pages/Home'
// import Menus from './pages/Menus'
// import Admin from './pages/Admin'
// import Login from './pages/User/Login'
// import Register from './pages/User/Register'
// import About from './pages/About'
import SubRoute from './utils/SubRoute';

//设置私有路由开关
const isAuthority = true;

const RouteConfig = [
  {
    path: '/',
    component: () => import('./pages/IndexPage'),
    // component:IndexPage,
    model: [],
    routes: [
      {
        path: '/home',
        component: () => import('./pages/Home'),
        // component:Home,
        isAuthority,
        model: [],
        redirect: true
      },
      {
        path: '/menus',
        component: () => import('./pages/Menus'),
        // component:Menus,
        isAuthority,
        model: []
      },
      {
        path: '/admin',
        component: () => import('./pages/Admin'),
        // component:Admin,
        isAuthority,
        model: []
      },
      {
        path: '/login',
        component: () => import('./pages/User/Login'),
        // component:Login,
        model: []
      },
      {
        path: '/register',
        component: () => import('./pages/User/Register'),
        // component:Register,
        model: []
      },
      {
        path: '/about',
        component: () => import('./pages/About'),
        // component:About,
        isAuthority,
        model: [],
        routes: [
          {
            path: '/about/history',
            model: [],
            component: () => import('./pages/About/History')
          },
          {
            path: '/about/contact',
            model: [],
            component: () => import('./pages/About/Contact'),
            routes: [
              {
                path: '/about/contact/phone',
                model: [],
                component: () => import('./pages/About/Phone')
              },
              {
                path: '/about/contact/contactAddr',
                model: [],
                component: () => import('./pages/About/ContactAddr')
              }
            ]
          },
          {
            path: '/about/address',
            model: [],
            component: () => import('./pages/About/Address')
          },
          {
            path: '/about/ordering',
            model: [],
            component: () => import('./pages/About/Ordering')
          }
        ]
      }
    ]
  }
];

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {RouteConfig.map((route, i) => (
          //调用封装组件
          <SubRoute key={i} {...route} app={app} />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
