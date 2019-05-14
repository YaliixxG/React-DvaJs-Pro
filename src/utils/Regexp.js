
//正则表达式校验

//邮箱
export const email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ 

//密码:由大写字母+小写字母+数字，8-16位组成
export const pwd_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/
