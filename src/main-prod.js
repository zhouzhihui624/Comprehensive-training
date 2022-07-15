import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
Vue.config.productionTip = false

//导入第三方组件vue-table-with-tree-grid
import TreeTable from 'vue-table-with-tree-grid'

//导入vue-quill-editor（富文本编辑器）
import VueQuillEditor from 'vue-quill-editor'

//导入进度条插件
import NProgress from 'nprogress'

import axios from 'axios'
Vue.prototype.$http = axios
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')