export default{
    //`babel-plugin-import --save` antd 按需加载webpack配置
    extraBabelPlugins:[
        ['import',{ libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ] 
}
