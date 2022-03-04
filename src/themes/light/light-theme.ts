import { AdminJSTheme } from 'adminjs';
import ThemeGenerator from '../../theme-generator';

const LightThemeOptions: AdminJSTheme = {
  details: { name: 'AdminJS Light theme' },
  colors: {
    bg: '#F8F9FE',
    container: '#FFFFFF',
    defaultText: '#1C1C38',
    border: '#dedede',
    sidebar: '#FFFFFF',
    navbar: '#FFFFFF',
    loginText: '#000000',
    loginBg: '#FFFFFF',
  },
  borderRadius: {
    navOpen: '20px',
  },
};

const LightTheme = new ThemeGenerator(LightThemeOptions)
  .generatePalete({ primary: '#3E7AEF' })
  .setColorMapping({
    welcomeText: 'white',
    welcomeBg: 'defaultText',
    navOpen: 'primary',
    navOpenText: 'white'
  })
  .toJSON();

export default LightTheme;
