import React, { Component } from 'react';
import { Table, Button, Row, Col } from 'antd';
import style from './index.scss';
import NewPizza from './NewPizza';

export default class index extends Component {
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
          <Button className={style['del-btn']}>
            <span>x</span>
          </Button>
        )
      }
    ];

    const dataSource = [
      {
        key: 1,
        name: 'pizza'
      }
    ];

    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={dataSource}
        columns={columns}
        locale={{ emptyText: '菜单栏没有任何商品' }}
      />
    );
  }

  renderNewPizza (){
    return <NewPizza />
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
