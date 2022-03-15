import { colors as defaultColors } from '@adminjs/design-system';
import { AdminJSTheme } from 'adminjs';
import chroma from 'chroma-js';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

type PaletteColors = Partial<Record<'primary' | 'grey', string>>;

const generateColorScale = (color: string, steps: number): string[] => {
  return chroma.scale([chroma(color).brighten(2), chroma(color)]).colors(steps);
};

/**
 * Theme generator for AdminJS
 * @returns ThemeGenerator
 * @example
 * ```
 * const theme = new ThemeGenerator({
 * {
 *   details: { name: 'AdminJS theme' },
 *   colors: {
 *     bg: '#FFFFFF'
 *   }
 * })
 *
 * // Then export to use as a theme in app as an AdminJSTheme
 * theme.toJSON()
 * ```
 */
class ThemeGenerator {
  private _theme: AdminJSTheme = {};

  /**
   * Default theme color mapping
   * @ignore
   */
  private _colorMapping: Record<string, string> = {
    dropdownHover: 'container',
    filterInputBorder: 'border',
    hoverBg: 'primary80',
    inputBorder: 'border',
    loginBg: 'container',
    navbar: 'container',
    separator: 'border',
    sidebar: 'container',
    tableHeader: 'container',
    tableHover: 'bg',
  };

  constructor(theme?: AdminJSTheme) {
    if (theme) {
      this._theme = { ...theme };
      if (!theme?.details)
        this._theme.details = {
          name: 'AdminJS Theme',
        };
    }
  }

  /**
   * Set color mapping by attach same color by a key e.g. set navbar color same as primary
   * @param  {} colorMapping
   * @returns ThemeGenerator
   * @example
   * ```
   * const MappedTheme = new ThemeGenerator()
   *   .setColorMapping({
   *     errorLight: 'errorDark',
   *     filterBg: 'container',
   *     infoLight: 'infoDark',
   *     navOpen: 'primary',
   *     successLight: 'successDark',
   *     welcomeBg: 'container',
   *   })
   * ```
   */
  setColorMapping(colorMapping: Record<string, string>): ThemeGenerator {
    this._colorMapping = merge(this._colorMapping, colorMapping);
    return this;
  }

  /**
   * Color mapping executed before JSON serialization
   * @returns void
   * @ignore
   */
  mapColors = (): void => {
    keys(this._colorMapping).forEach(key => {
      const colors = this._theme.colors;
      if (colors && !colors[key]) {
        colors[key] =
          colors[this._colorMapping[key]] ||
          defaultColors[this._colorMapping[key]];
      }
      this._theme.colors = { ...this._theme.colors, ...colors };
    });
  };

  /**
   * @param  {PaletteColors} colors
   * @returns ThemeGenerator
   */
  generatePalette = (colors: PaletteColors = {}): ThemeGenerator => {
    const palette = keys(colors).reduce((acc, key) => {
      const colorsPalette = generateColorScale(colors[key], 5).reduce(
        (acc, curr, index) => {
          acc[`${key}${++index * 20}`] = curr;
          return acc;
        },
        { [key]: colors[key] }
      );
      return { ...acc, ...colorsPalette };
    }, {});

    this._theme.colors = merge(this._theme?.colors, palette);
    return this;
  };

  /**
   * Serialize theme to AdminJSTheme json
   * @example
   * ```
   * {
   *   details: { name: 'AdminJS theme' },
   *   colors: {
   *     bg: '#192035',
   *     primary: '#48589A',
   *     primary20: '#aab4ff',
   *     primary40: '#919de6',
   *     primary60: '#7986cc',
   *     primary80: '#606fb3',
   *     primary100: '#48589a'
   *   },
   *   borderRadius: { navOpen: '20px' },
   *   shadows: {
   *     login: '0 15px 24px 0 rgba(0, 0, 0, 0.3)',
   *   }
   * }
   * ```
   * @returns AdminJSTheme
   */
  toJSON = (): AdminJSTheme => {
    this.mapColors();
    return { ...this._theme };
  };
}

export default ThemeGenerator;
