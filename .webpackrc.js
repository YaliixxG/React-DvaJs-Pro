
const path = require('path');

export default{
    //`babel-plugin-import --save` antd 按需加载webpack配置
    extraBabelPlugins:[
        ['import',{ libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ],
    //引入静态文件配置路径
    alias: {
        Assets: path.resolve(__dirname,'./src/assets')
    }
}
