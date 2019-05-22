# React-DvaJs-Pro
React+DvaJs实现简单的点餐系统demo

* 动态加载路由组件
* 路由守卫
* 二级路由，三级路由
* 展示注册和登录
* 表单校验
* 存储注册信息
* 登录验证
* 登录后的状态管理
* 隐藏登录和注册按钮
* 显示用户信息和退出
* 菜单页面的效果展示
* 展示菜单页面
* 购物车展示以及添加商品操作
* 添加购物车加减功能
* 计算总价以及解决重复添加购物类别的问题
* 添加新菜单类别组件
* 新菜单类别数据存取到接口中
* 从数据接口中删除菜单类别

--------------------------------------------------------------  
1. reducer里面必须是纯函数，什么是纯函数？  
    * 一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。

--------------------------------------------------------------
## 官方案例学习

dva相当于将很多的API集中到了一起，变为了更为统一的API。  

#### 1. 引入依赖  
```js
import React from 'react';
import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router'
```
#### 2. 创建应用，返回dva实例  
```js
const app = dva()
```  
`app`：统领所有API的载体，你会发现store和路由都是统一“绑在”app上的。 组件不是，组件仍然独立。  

#### 3. 注册`model`  
`dva`将原来的`Redux`中`combineReducer`这个东西进行了一个拆分：  
```js
app.model({
    namespace: 'count', //model的命名空间，同时也是他在全局  state 上的属性
    state: 0, //初始值
    reducers: { //用于处理同步操作，由 action 触发
        add(state) { return state + 1 }
        minus(state) { return state - 1 }
    }
})
```  
相当于将一个个的`reducer`，原来可以用`combineReducer`合并，现在可以用  
```js
app.model()
app.model()
app.model()
```  
这样的形式来进行组织。  
发送命令的时候，必须加上命名空间。  
```js  
this.props.dispatch({'type':'count/add'}) 
``` 
#### 4. connect  

`dva`帮我们隐形的完成了`dispatch`和`props`的映射函数：  

```js  
App = connect(({count}) =>{
    return {
        count:count
    }    
})(App)
```
在组件的内部任意时候都可以去进行一个`action`的发送操作，不需要再注入`constructor`中的`props`：  
```js  
this.props.dispatch({'type':'count/add'}) 
``` 
`model`可以自由的交给任何一个组件去发送 `action`去改变它。  

#### 5.开机启动  
```js
app.start('#root')
```
#### 6. effects 

`put`：你就认为`put`就等于 `dispatch`就可以了；  
`call`：可以理解为实行一个异步函数,是阻塞型的，只有运行完后面的函数，才会继续往下；在这里可以片面的理解为`async`中的`await`！但写法直观多了！


