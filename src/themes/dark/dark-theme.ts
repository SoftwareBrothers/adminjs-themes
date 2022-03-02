import { AdminJSTheme } from 'adminjs';
import ThemeGenerator from '../../theme-generator';

const DarkThemeOptions: AdminJSTheme = {
  details: { name: 'AdminJS Dark theme' },
  colors: {
    bg: '#192035',
    border: '#2E324A',
    container: '#20273E',
    defaultText: '#FFFFFF',
    loginText: '#FFFFFF',
    loginWelcomeText: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.3)',
    white: '#FAFAFA',
  },
  borderRadius: {
    navOpen: '20px',
  },
  shadows: {
    login: '0 15px 24px 0 rgba(0, 0, 0, 0.3)',
    cardHover: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
    drawer: '-2px 0 8px 0 rgba(0, 0, 0, 0.3)',
    card: '0 1px 6px 0 rgba(0, 0, 0, 0.3)',
    inputFocus: 'none',
    buttonFocus: 'none',
  },
};

const DarkTheme = new ThemeGenerator(DarkThemeOptions)
  .generatePalete({ primary: '#32A887', grey: '#d3d3d3' })
  .setColorMapping({
    successLight: 'successDark',
    infoLight: 'infoDark',
    errorLight: 'errorDark',
    navOpen: 'primary',
  })
  .toJSON();

  console.log(DarkTheme);


export default DarkTheme;
