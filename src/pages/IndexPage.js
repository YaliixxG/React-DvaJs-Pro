import React from 'react';
import { connect } from 'dva';
import { Switch, Route, Redirect } from 'dva/router'
import styles from './IndexPage.scss';
import { Layout } from 'antd';
import NavBar from './NavBar'
import Home from './Home'
import Menus from './Menus'
import Admin from './Admin'
import About from './About'
import Login from './User/login'
import Regist from './User/register'

const { Header, Content} = Layout 

function IndexPage(props) {

  return (
   <Layout className={styles.layout}>
     <Header className={styles.header}><NavBar {...props} /></Header>
       <Content className={styles.content}>
         <Switch>
           <Route path="/home" component={Home} />
           <Route path="/menus" component={Menus} />
           <Route path="/admin" component={Admin} />
           <Route path="/about" component={About} />
           <Route path="/Login" component={Login} />
           <Route path="/Regist" component={Regist} />
         </Switch>
         <Redirect to={'/home'} />
         
       
       </Content>
   </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
