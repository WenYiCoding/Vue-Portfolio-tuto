import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faXmark, faDownload, faCode, faMobileAlt, faComputer, faAnglesLeft, faAnglesRight, faAnglesUp } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faXmark, faDownload, faCode, faMobileAlt, faComputer, faAnglesLeft, faAnglesRight, faAnglesUp);
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
