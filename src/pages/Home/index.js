import React, { Component } from 'react'
import style from './index.scss'

export default class index extends Component {
  render() {
    return (
      <div className={style.home}>
        <div className={style.mask}>
          <h1>欢迎来到YaliixxG的餐厅！</h1>
          <h2>这里提供了各式各样的小吃！</h2>
        </div>
      </div>
    )
  }
}
