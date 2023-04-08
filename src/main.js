import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import store from "@/components/store";

createApp(App).use(store).mount('#app')
