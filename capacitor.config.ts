import type { CapacitorConfig } from '@capacitor/cli';

// Configuração do Capacitor para app nativo PowerFit
const config: CapacitorConfig = {
  // Identificador único do app nas lojas
  appId: 'com.powerfit.academia',
  appName: 'PowerFit Academia',
  webDir: 'dist',
  
  // Configuração do servidor para hot-reload durante desenvolvimento
  server: {
    url: 'https://cd02387f-8c63-4954-8831-5391de179120.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  
  // Configurações específicas do Android
  android: {
    backgroundColor: '#1a1a1a',
    allowMixedContent: true
  },
  
  // Configurações específicas do iOS
  ios: {
    backgroundColor: '#1a1a1a',
    contentInset: 'automatic'
  },
  
  // Configuração de plugins
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#1a1a1a',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
