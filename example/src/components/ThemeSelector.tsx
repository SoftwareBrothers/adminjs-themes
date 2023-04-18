import {
  Box,
  Button,
  DropDown,
  DropDownItem,
  DropDownMenu,
  DropDownTrigger,
  Icon,
} from '@adminjs/design-system';
import { ThemeConfig, useTranslation } from 'adminjs';
import React from 'react';
import { useSelector } from 'react-redux';

const ThemeSelector = () => {
  const availableThemes: ThemeConfig[] = useSelector(
    (state: any) => state.theme.availableThemes
  );
  const currentTheme: ThemeConfig = useSelector((state: any) => state.theme);
  const { translateComponent } = useTranslation();
  const changeTheme = (theme: ThemeConfig) => {
    console.log(theme);
  };

  return (
    <Box flex flexGrow={1} alignItems="center" ml="lg">
      <DropDown>
        <DropDownTrigger>
          <Button color="text">
            <Icon icon="Layers" />
            {translateComponent(
              `ThemeSelector.availableThemes.${currentTheme}`,
              { defaultValue: currentTheme.name }
            )}
          </Button>
        </DropDownTrigger>
        <DropDownMenu>
          {availableThemes.map(theme => (
            <DropDownItem key={theme.id}>
              {translateComponent(`ThemeSelector.availableThemes.${theme}`, {
                defaultValue: theme.name,
              })}
            </DropDownItem>
          ))}
        </DropDownMenu>
      </DropDown>
    </Box>
  );
};

export default ThemeSelector;
