import { AdminJSTheme } from 'adminjs';
import { colors as defaultColors } from '@adminjs/design-system';
import chroma from 'chroma-js';
import merge from 'lodash/merge';
import keys from 'lodash/keys';

type GenerateColors = 'primary' | 'grey';

const colorScale = (color: string, steps: number): string[] => {
  return chroma.scale([chroma(color).brighten(2), chroma(color)]).colors(steps);
};

class ThemeGenerator {
  private _theme: AdminJSTheme = {};
  private _colorMapping: Record<string, string> = {
    filterBg: 'container',
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
    if (theme) this._theme = theme;
  }

  setColorMapping(colorMapping: Record<string, string>) {
    this._colorMapping = merge(this._colorMapping, colorMapping);
    return this;
  }

  mapColors = () => {
    keys(this._colorMapping).forEach(key => {
      const colors = this._theme.colors;
      if (colors && !colors[key]) {
        colors[key] =
          colors[this._colorMapping[key]] ||
          defaultColors[this._colorMapping[key]];
      }
      this._theme.colors = colors;
    });
  };

  generatePalete = (colors: Partial<Record<GenerateColors, string>> = {}) => {
    const palete = keys(colors).reduce((acc, key) => {
      const colorsPalete = colorScale(colors[key], 5).reduce(
        (acc, curr, index) => {
          acc[`${key}${++index * 20}`] = curr;
          return acc;
        },
        { [key]: colors[key] }
      );
      return { ...acc, ...colorsPalete };
    }, {});

    this._theme.colors = merge(this._theme?.colors, palete);
    return this;
  };

  toJSON = (): AdminJSTheme => {
    this.mapColors();
    return this._theme;
  };
}

export default ThemeGenerator;
