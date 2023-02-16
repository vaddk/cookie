import { createApp } from 'vue'
import App from './App.vue'
import cookie from './index'

const app = createApp(App)
app.use(cookie)

app.mount('#app')
