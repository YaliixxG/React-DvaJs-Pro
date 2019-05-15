import React from 'react';
import { Table, Button, Icon } from 'antd';

export default function index() {
  const columns = [
    {
      title: '尺寸',
      dataIndex: 'size',
      key: 'size',
      render: (text, record) => <span>{text}</span>
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
            <Button>
              <Icon type="plus" />
            </Button>
          ),
          props:{}  //设置props,当colSpan为0时，不渲染
        };
        if(!record.price){
          obj.props.colSpan = 0;
        }
        return obj
      }

    }
  ];

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
      name: item.name
    });
    item.options.forEach((ele, index) => {
      //key值必须是不同的，所以这样拼接
      dataSource.push({ ...ele, key: i + '-' + index });
    });
  }
  console.log(dataSource);
  return <Table dataSource={dataSource} columns={columns} />;
}
