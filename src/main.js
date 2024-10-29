import "./assets/style.css"
import "primeicons/primeicons.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://test1.ip-167-235-30-42.swiftwave.xyz');

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.config.globalProperties.$pb = pb

app.mount('#app')
