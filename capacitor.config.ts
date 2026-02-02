import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lgis.mobile',
  appName: 'LGIS Mobile',
  webDir: 'dist/public',
  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: ["*"]
  }
};

export default config;
