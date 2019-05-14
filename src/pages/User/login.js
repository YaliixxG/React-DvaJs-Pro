import React, { Component } from 'react';
import Logo from 'Assets/homeBg.jpeg';
import { Form, Input, Button, Message } from 'antd';
import { connect } from 'dva';
import style from './account.scss';
import { email_reg, pwd_reg } from '../../utils/Regexp';
import Request from '../../utils/Request';

//如果不connect，dispatch是会报错的
@connect()
class Login extends Component {
  //自定义校验规则回调函数
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
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
      if (!err) {
        //将其解构出来
        const { email, pwd } = values;
        Request('users.json')
          .then(res => {
            if (!err) {
              const { data, status } = res;
              let users = [];
              if (res && status === 200 && data) {
                for (const key in data) {
                  users.push({
                    ...data[key],
                    key
                  });
                }
              }
              //判断账号密码是否匹配
              //filter方法会根据 规则 过滤出 符合规则的新数组
              users = users.filter(user => {
                return user.pwd === pwd && user.email === email;
              });
              //判断users里面是否有内容，没有则证明没有可匹配的正确账号密码，有则登陆成功
              if (users && users.length) {
                //把账户和key存到 ls ,不存密码
                localStorage.setItem('email',users[0].email)
                localStorage.setItem('key',users[0].key)

                //将账号密码存储到models
                this.props
                  .dispatch({
                    type: 'global/setUserInfo',
                    payload: users[0]
                  })
                  .then(() => {
                    //存完以后执行页面跳转
                    this.props.history.push('/');
                  });
              }else{
                Message.error('邮箱或密码错误，请重新输入！')
              }
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.account}>
        <img src={Logo} className={style.logo} alt="标志" />
        <Form className="account-form">
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空'
                },
                {
                  //自定义规则校验
                  validator: this.validatorForm,
                  pattern: email_reg,
                  message: '请输入正确的邮箱格式'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
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
            })(
              <Input maxLength={16} type="password" placeholder="请输入密码" />
            )}
          </Form.Item>
          <Form.Item>
            <Button className="btn" type="primary" onClick={this.handleSubmit}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
