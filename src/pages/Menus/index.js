import React, { Component } from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';
import style from './index.scss';

export default class index extends Component {
  state = {
    cart: [] //购物车数组
  };

  //菜单渲染
  renderMenusTable() {
    const columns = [
      {
        title: '尺寸',
        dataIndex: 'size',
        key: 'size',
        render: (text, record) => {
          //这个判断是用来解决标题的下划线的长度问题，这个条件是通过字段来区分是不是标题栏
          if (record.price) {
            return <span>{text}</span>;
          }
          return {
            children: <strong>{text}</strong>,
            props: {
              colSpan: 2 //列的长度，如果设置为0 则不显示
            }
          };
        }
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (text, record) => <span>{text}</span>
      },
      {
        title: '加入',
        key: 'plus',
        render: (text, record) => {
          //console.log('text',text,'record',record)
          const obj = {
            children: (
              <Button
                onClick={() => handleAddMenus(record)}
                className={style['add-btn']}
              >
                <Icon type="plus" />
              </Button>
            ),
            props: {} //设置props,当colSpan为0时，不渲染
          };
          if (!record.price) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      }
    ];

    //点击添加进购物车
    const handleAddMenus = record => {
      //console.log(record)

      //存储到状态中
      this.setState({
        cart: [
          ...this.state.cart, //这里是把购物车已存进去的数据放在里面
          {
            ...record,
            count: 1
          }
        ]
      });
      console.log('000', this.state.cart);
    };

    let data = {
      1: {
        name: '水果pizza',
        description: '多种水果的',
        options: [
          {
            size: 9,
            price: 48
          },
          {
            size: 12,
            price: 68
          }
        ]
      },
      2: {
        name: '弗洛伦萨pizza',
        description: '培根火腿',
        options: [
          {
            size: 9,
            price: 68
          },
          {
            size: 12,
            price: 98
          }
        ]
      },
      3: {
        name: '意大利pizza',
        description: '各种食物的大杂烩',
        options: [
          {
            size: 9,
            price: 98
          },
          {
            size: 12,
            price: 128
          }
        ]
      }
    };
    //处理数据格式
    let dataSource = [];
    for (const i in data) {
      let item = data[i];
      dataSource.push({
        //key值其实可写可不写，但是没有key值会出现警告
        key: item.name,
        size: item.name
      });
      item.options.forEach((ele, index) => {
        //key值必须是不同的，所以这样拼接
        dataSource.push({ ...ele, name: item.name, key: i + '-' + index });
      });
    }
    console.log(dataSource);
    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={dataSource}
        columns={columns}
      />
    );
  }

  //购物车渲染
  renderCartTable() {
    const columns = [
      {
        key: 'count',
        title: '数量',
        dataIndex: 'count',
        render: (text, record) => (
          <span>
            <Button
              onClick={() => handleDecrease(record)}
              className={style['cart-btn']}
            >
              -
            </Button>
            <span>{record.count}</span>
            <Button
              onClick={() => handleIncrease(record)}
              className={style['cart-btn']}
            >
              +
            </Button>
          </span>
        )
      },
      {
        key: 'name',
        title: '菜单',
        dataIndex: 'name'
      },
      {
        key: 'price',
        title: '价格',
        dataIndex: 'price'
      }
    ];

    //减
    const handleDecrease = record => {
      const { cart } = this.state;

      //拿到点击的项的对应下标,record可以打印，它就是当前点击的这个对象
      const index = cart.findIndex(item => item.key === record.key);

      //当前这一项
      const current = cart[index];
      //判断这一项的count是多少，如果小于等于1，则直接从购物车数组中删掉，否则count减一
      //splice(删除项的下标，从删除项开始几个，添加的项)
      if (current.count <= 1) {
        cart.splice(index, 1);
      } else {
        cart.splice(index, 1, {
          ...current,//添加一个当前项进去，但是count改为减一
          count: current.count - 1
        });
      }

      this.setState({
        cart
      })
    };

    //加
    const handleIncrease = record => {
      const { cart } = this.state;

      //拿到点击的项的对应下标,record可以打印，它就是当前点击的这个对象
      const index = cart.findIndex(item => item.key === record.key);

      //当前这一项
      const current = cart[index];
      //splice(删除项的下标，从删除项开始几个，添加的项)
      //商品+1
        cart.splice(index,1,{
          ...current,//添加一个当前项进去，但是count改为减一
          count: current.count + 1
        });

      this.setState({
        cart
      })
    };


    return (
      <Table
        locale={{ emptyText: '购物车没有任何商品' }}
        className="menus-table cart"
        pagination={false}
        dataSource={this.state.cart}
        columns={columns}
      />
    );
  }

  render() {
    return (
      <Row>
        <Col sm={24} md={16}>
          {this.renderMenusTable()}
        </Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={style['total-price']}>总价：</p>
          <Button type="primary" className={style['submit-btn']}>
            提交
          </Button>
        </Col>
      </Row>
    );
  }
}
