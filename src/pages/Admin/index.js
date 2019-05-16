import React, { Component } from 'react';
import { Table, Button, Row, Col, Message } from 'antd';
import Request from '../../utils/Request';
import style from './index.scss';
import NewPizza from './NewPizza';

export default class index extends Component {
  state = {
    //右边删除模块的菜单数据
    menus: []
  };

  //钩子函数
  componentDidMount() {
    this.getMenusData();
  }

  //网络请求接口，获取菜单数据
  getMenusData = () => {
    Request('/menu.json').then(res => {
      if (res && res.status === 200 && res.data) {
        //删除菜单栏的数据 只需要品种名字，所以通过遍历提取出来
        const menusData = [];
        const { data } = res;
        for (const key in data) {
          menusData.push({
            key: key,
            name: data[key].name
          });
        }
        this.setState({
          menus: menusData
        });
      }
    });
  };

  renderMenusTable() {
    const columns = [
      {
        key: 'name',
        title: '品种',
        dataIndex: 'name'
      },
      {
        key: 'action',
        title: '删除',
        render: (text, record) => (
          <Button
            className={style['del-btn']}
            onClick={() => handleDelete(record)}
          >
            <span>x</span>
          </Button>
        )
      }
    ];

    //删除菜单类别
    const handleDelete = record => {
      Request(`/menu/${record.key}.json`, {
        method: 'delete'
      }).then(res => {
        //console.log(res)

        //如果删除成功则跳转至菜单页
        if (res && res.status === 200) {
          Message.success('删除成功');
          window.location.href = '/#/menus';
        } else {
          Message.error('删除失败');
        }
      });
    };

    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={this.state.menus}
        columns={columns}
        locale={{ emptyText: '菜单栏没有任何商品' }}
      />
    );
  }

  renderNewPizza() {
    return <NewPizza />;
  }

  render() {
    return (
      <Row className={style.admin}>
        <Col sm={24} md={16} className={style.left}>
          {this.renderNewPizza()}
        </Col>
        <Col sm={24} md={8} className={style.right}>
          <h3>菜单</h3>
          {this.renderMenusTable()}
        </Col>
      </Row>
    );
  }
}
