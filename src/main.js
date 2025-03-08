import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS
import './index.css'; // Ensure Tailwind CSS is imported

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
