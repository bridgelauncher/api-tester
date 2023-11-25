import '@/assets/styles/page.scss';
import '@/assets/styles/base.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VWave from 'v-wave';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(VWave, { cancellationPeriod: 100 });

app.mount('#app');
