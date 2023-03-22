import { Box } from '@adminjs/design-system';
import { ViewHelpers } from 'adminjs';
import React from 'react';
import Logo from '../assets/logo.js';

const h = new ViewHelpers()

const SidebarBranding = () => (
  <Box as="a" href={h.dashboardUrl()} flex alignItems="center" justifyContent="center" py="xl">
    <Logo />
  </Box>
);

export default SidebarBranding;
