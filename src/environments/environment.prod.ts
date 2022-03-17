import { Settings } from '../app/components/settings/settings';

const defaultSettings: Settings = {
  theme: 'auto',
  countdown: 120,
  sound: true,
};

export const environment = {
  production: true,
  settings: defaultSettings
};
