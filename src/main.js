import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
const app = createApp(App)
import JsonExcel from 'vue-json-excel'
installElementPlus(app)

app
    .use(store)
    .use(router)
    .component("download-excel",JsonExcel)
    .mount('#app')

