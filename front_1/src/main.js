// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Иконки (если нужны)
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'greyblue',
    themes: {
      greyblue: {
        dark: false,
        colors: {
          // серая + голубая палитра — primary ярко-синий, остальное — серо-голубое
          primary: '#0d6eff',          // ярко-синий (кнопка)
          secondary: '#7f8fa6',        // серо-голубой
          surface: '#f4f7fa',          // карта / фон формы
          background: '#eef3f8',       // общий фон
          'on-primary': '#ffffff'
        }
      }
    }
  }
})

createApp(App).use(vuetify).mount('#app')
