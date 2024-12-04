import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from 'echarts';
import "./assets/reset.css";

const app = createApp(App)
app.use(echarts);
app.mount('#app')
