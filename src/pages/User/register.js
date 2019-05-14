import React, { Component } from 'react';
import Logo from 'Assets/homeBg.jpeg';
import { Form, Input, Button } from 'antd';
import style from './account.scss';
import { email_reg, pwd_reg } from '../../utils/Regexp';
import Request from '../../utils/Request';

class Register extends Component {
  state = {
    email: '529008422@qq.com'
  };

  //自定义校验规则回调函数
  validatorForm = (rule, value, callback) => {
    console.log('正则', rule.pattern, value.match(rule.pattern));
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      //必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  };

  //检验两次输入的密码是否一致
  validatorPwd = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue('pwd')) {
      callback(rule.message);
    } else {
      //必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  };

  //Submit表单提交
  handleSubmit = e => {
    //阻止默认事件
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //values可以进行打印，打印出来会发现这是表单输入的内容
      //       打印 values 得到这样一个对象：{
      //         apwd: "a11111111A"
      // email: "526778532@qq.com"
      // pwd: "a11111111A"
      //       }
      if (!err) {
        //将其解构出来
        const { email, pwd } = values;
        console.log('参数', email, pwd);

        //发送数据 安装 npm install axios --save
        Request('/users.json', {
          method: 'post',
          data: { email, pwd }
        }).then(res => {
          if(res.status === 200 && res.data){
            this.props.history.push('/login')
          }
        }).catch(err => console.log(err))
      }
    });
  };

  render() {
    //getFieldDecorator用于和表单进行双向绑定
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.account}>
        <img src={Logo} className={style.logo} alt="标志" />
        <Form className="account-form">
          <Form.Item label="邮箱">
            {/* <Input type="text"/> */}
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空'
                },
                // {
                //   //自带的方法校验格式
                //   type:'email',
                //   message: '请输入正确的邮箱格式'
                // }
                {
                  //自定义规则校验
                  validator: this.validatorForm,
                  pattern: email_reg,
                  message: '请输入正确的邮箱格式'
                }
              ]

              //initialValue: this.state.email
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {/* <Input type="password" /> */}
            {getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                },
                {
                  //自定义规则校验
                  validator: this.validatorForm,
                  pattern: pwd_reg,
                  message:
                    '请输入正确的密码格式(密码由大写字母+小写字母+数字，8-16位组成)'
                }
              ]
            })(<Input maxLength={16} type="password" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item label="确认密码">
            {/* <Input type="password" /> */}
            {getFieldDecorator('apwd', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                },
                {
                  //自定义规则校验
                  validator: this.validatorPwd,
                  message: '两次输入的密码不一致'
                }
              ]

              //initialValue: this.state.email
            })(<Input maxLength={16} type="password" placeholder="请确认密码" />)}
          </Form.Item>
          <Form.Item>
            <Button className="btn" type="primary" onClick={this.handleSubmit}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

//ant-design: 经过 Form.create 包装的组件将会自带 this.props.form 属性
//不能用于包装纯函数组件，function XX
export default Form.create()(Register);
