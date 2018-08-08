import Vue from 'vue'
import App from './App'
// 5.0 引入路由模块
import router from './router'

// 引入store    

import store from './store'

// 全局引入的mint-ui   
import MintUI from 'mint-ui'
// 注册mint-ui
Vue.use(MintUI)
// 引入mint-ui的样式
import 'mint-ui/lib/style.css'

// 按需引入 不需要引入css样式  
// import { Button, Cell } from 'mint-ui'
// Vue.component(Button.name, Button)


// 引入mui css样式 
import './lib/mui/css/mui.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 1. 引入定义好的组件 
// import MuiButton from './muicomponents/muibutton'
// 2. 注册组件  
// Vue.component('mui-button',MuiButton)

// 导入 vue-resource
import VueResource from 'vue-resource'
// 注册 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://localhost:5000/';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})


// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // 6.0 注册路由
  router,
  store,
  // 这连句话类似于  render: c => c(App)
  // components: { App },
  // template: '<App/>'

  render: c => c(App)
})
