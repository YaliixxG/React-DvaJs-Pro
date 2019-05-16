import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

class NewPizza extends Component {
  render() {
    //设置表单样式
    const formItemLayout = {
      //设置label的宽度，24代表占满一行
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },

      //设置input的宽度
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      },

      //设置是否带冒号”：“
      colon: false
    };

    //经过 Form.create 包装的组件将会自带 this.props.form 属性
    //getFieldDecorator用于和表单进行双向绑定
    const { getFieldDecorator } = this.props.form;
    const required = true;

    return (
      <div>
        <h3>添加新的菜单 😸</h3>
        <Form>
          <Form.Item {...formItemLayout} label="品种">
            {getFieldDecorator('name', {
              rules: [
                {
                  required,
                  message: '请输入品种'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="描述">
            {getFieldDecorator('description')(<TextArea />)}
          </Form.Item>
          <p>
            <strong>选项一：</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator('size1', {
              rules: [
                {
                  required,
                  message: '请输入尺寸'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="价格">
            {getFieldDecorator('price1', {
              rules: [
                {
                  required,
                  message: '请输入价格'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <p>
            <strong>选项二：</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator('size2', {
              rules: [
                {
                  required,
                  message: '请输入尺寸'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="价格">
            {getFieldDecorator('price2', {
              rules: [
                {
                  required,
                  message: '请输入价格'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="btn-w-p100">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
//双向数据绑定需要进行的必要组件包装 Form.create()(组件名)
export default Form.create()(NewPizza);
