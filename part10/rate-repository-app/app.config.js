export default {
  expo: {
    name: 'rate-repository-app',
    slug: 'rate-repository-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',

    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    ios: {
      supportsTablet: true,
    },

    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      package: 'com.amandau.raterepositoryapp',
    },

    web: {
      favicon: './assets/favicon.png',
    },

    extra: {
      apolloUri: process.env.EXPO_PUBLIC_APOLLO_URI,

      eas: {
        projectId: '607b4890-066b-4378-99ce-04669664d79c',
      },
    },

    runtimeVersion: {
      policy: 'appVersion',
    },

    updates: {
      url: 'https://u.expo.dev/607b4890-066b-4378-99ce-04669664d79c',
    },
  },
};