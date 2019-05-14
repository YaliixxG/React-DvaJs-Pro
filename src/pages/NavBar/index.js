import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'dva/router';
import style from './index.scss';

const MenusRouteList = [
  {
    key: 'home',
    path: '/home',
    name: '主页'
  },
  {
    key: 'menus',
    path: '/menus',
    name: '菜单'
  },
  {
    key: 'admin',
    path: '/admin',
    name: '管理'
  },
  {
    key: 'about',
    path: '/about',
    name: '关于我们'
  },
  {
    key: 'login',
    path: '/login',
    name: '登录',
    className: style.login,
    //给登录和注册设置这个key值，主要是用于区别其他的路由，用于filter过滤
    //如果登录成功了，我们即把登录和注册隐藏掉
    isAuthority: true
  },
  {
    key: 'register',
    path: '/register',
    name: '注册',
    className: style.register,
    isAuthority: true
  }
];
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
  }

  handleSelectedKeys(pathname) {
    const temp = pathname.split('/');
    const key = temp && temp.length < 2 ? 'home' : temp[1];
    this.setState({
      selectedKeys: [key]
    });
  }

  componentDidMount() {
    this.handleSelectedKeys(this.props.location.pathname);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { props } = this.props;
    if (nextProps !== props) {
      this.handleSelectedKeys(nextProps.location.pathname);
    }
  }

  handleUserInfoArea = ({key}) => {
    //判断点击的是否是退出按钮
    if(key === 'logout'){
      window.localStorage.clear()
      this.props.history.push('/login')
    }
  }

  userInfoArea = (
    <Menu onClick = { this.handleUserInfoArea}>
      <Menu.Item key={'logout'}>
        <span>退出</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <nav className={style.navBar}>
        <a className={style.logo} href="/#/home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="d-block mx-auto"
          >
            <circle r="10" cx="12" cy="12" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
        </a>
        <Menu
          className={style['menu-left']}
          mode="horizontal"
          defaultSelectedKeys={['home']}
          selectedKeys={this.state.selectedKeys}
        >
          {/* 遍历路由并且用 登录和注册独有设置的isAuthority来过滤,
          再通过localStorage是否有值来判断是否登录*/}
          {MenusRouteList.filter(
            ({ isAuthority }) =>
              !(isAuthority && localStorage.key && localStorage.email)
          ).map(({ key, path, name, className }) => (
            <Menu.Item key={key} className={className}>
              <Link to={path}>{name}</Link>
            </Menu.Item>
          ))}
          {/* <Menu.Item key={'home'}>
            <Link to="/home">主页</Link>
          </Menu.Item>
          <Menu.Item key={'menus'}>
            <Link to="/menus">菜单</Link>
          </Menu.Item>
          <Menu.Item key={'admin'}>
            <Link to="/admin">管理</Link>
          </Menu.Item>
          <Menu.Item key={'about'}>
            <Link to="/about">关于我们</Link>
          </Menu.Item>
          <Menu.Item key={'login'} className={style.login}>
            <Link to="/login">登录</Link>
          </Menu.Item>
          <Menu.Item key={'register'} className={style.register}>
            <Link to="/register">注册</Link>
          </Menu.Item> */}
        </Menu>
        {/* 用户登录后的邮箱展示，以及退出 */}
        {localStorage.email && localStorage.key && (
          <Dropdown overlay={this.userInfoArea} className={style['dropdown-menu']}>
            <a className="ant-dropdown-link" href="#">
              <span className={style.email}>{localStorage.email}</span>
              <Icon type="down" className={style.icon}/>
            </a>
          </Dropdown>
        )}
      </nav>
    );
  }
}
