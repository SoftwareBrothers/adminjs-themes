import { AdminJSTheme } from 'adminjs';
import ThemeGenerator from '../../theme-generator';

const LightThemeOptions: AdminJSTheme = {
  details: { name: 'AdminJS Light theme' },
  colors: {
    bg: '#F8F9FE',
    container: '#FFFFFF',
    defaultText: '#1C1C38',
    border: '#F8F9FE'
  },
  borderRadius: {
    navOpen: '20px',
  },
};

const LightTheme = new ThemeGenerator(LightThemeOptions)
  .generatePalete({ primary: '#3E7AEF' })
  .toJSON();

export default LightTheme;
