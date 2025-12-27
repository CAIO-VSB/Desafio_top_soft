import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'

import App from './App.vue'
import router from './router'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import iconSet from 'quasar/icon-set/fontawesome-v6'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify
  },
  iconSet: iconSet // import Quasar plugins and add here
})

app.use(createPinia())
app.use(router)

app.mount('#app')
