import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.samsung.nsw26.quiz',
  appName: 'Samsung Galaxy Quiz',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
