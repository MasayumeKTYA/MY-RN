import { Platform } from 'react-native';

export const androidRipple = {
  borderless: true,
  foreground: Platform.OS === 'android' && Platform.Version >= 23,
  radius: 20,
};

