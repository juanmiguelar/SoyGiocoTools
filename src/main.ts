// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import * as components from 'vuetify/components'; // Import Vuetify components
import * as directives from 'vuetify/directives'; // Import Vuetify directives
import { useHistoryStore } from './stores/AgreementHistoryStore'; // Import your store
import messages from './locales/messages'; // Archivo con tus traducciones

const vuetify = createVuetify({
  components,
  directives,
});

// Configuración de vue-i18n
const i18n = createI18n({
  legacy: false, // Asegúrate de deshabilitar el modo legacy
  locale: 'es', // Idioma predeterminado
  fallbackLocale: 'en', // Idioma de respaldo
  messages, // Traducciones
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(i18n); // Habilita i18n en la aplicación
// Load history store before mounting the app
const historyStore = useHistoryStore(pinia); // Pass the Pinia instance to ensure correct store initialization
historyStore.loadHistory().then(() => {
  app.mount('#app'); // Mount the app only after the history is loaded
});
