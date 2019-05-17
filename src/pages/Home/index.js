import React, { Component } from 'react';
import { connect } from 'dva';
import style from './index.scss';


//通过 @connect 将model和组件绑在一起，拿到model中的数据
//这种形式的写法必须写在export default class前面
@connect(({global})=> ({
  hello:global.hello
}))
export default class index extends Component {
  render() {
    console.log(this.props.userInfo);
    return (
      <div className={style.home}>
        <div className={style.mask}>
          <h1>{this.props.hello}，欢迎来到YaliixxG的餐厅！</h1>
          <h2>这里提供了各式各样的小吃!</h2>
        </div>
      </div>
    );
  }
}
