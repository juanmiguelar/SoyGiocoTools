import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.soygiocotools.app',
  appName: 'SoyGiocoTools',
  webDir: 'dist',
  ios: {
    buildVersion: '1.1.0', // Incrementa el número de compilación
    version: '1.1.0', // Define la nueva versión de la aplicación
  },
};

export default config;
