import { Box, H1, H3 } from '@adminjs/design-system';
import { BrandingOptions } from 'adminjs';
import React, { FC } from 'react';
import { themes as themes } from '../themes';
import chroma from 'chroma-js';

const Color: FC<{ text: string; color: string }> = ({ text, color }) => {
  let textColor = color;
  try {
    textColor = chroma(color).get('lab.l') < 70 ? 'white' : 'black';
  } catch (error) {
    console.error(error);
  }
  return (
    <Box
      style={{ padding: 10, background: color, color: textColor }}
      flex
      justifyContent="space-between"
    >
      <Box>{text}</Box>
      <Box>{color}</Box>
    </Box>
  );
};

const Theme: FC<BrandingOptions> = ({ theme = {} }) => {
  const colors = theme.colors;
  return (
    <Box width={['100%']} paddingX="xl">
      <H3>{theme.details?.name || 'Theme'}</H3>
      {colors &&
        Object.keys(colors).sort().map(key => (
          <Color color={colors[key]} text={key} />
        ))}
    </Box>
  );
};

const Palete: FC = () => {
  return (
    <Box paddingY="xl" flex justifyContent="space-between">
      {themes && themes.map(theme => <Theme theme={theme} />)}
    </Box>
  );
};

export default Palete;
