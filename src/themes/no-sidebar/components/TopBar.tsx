import {
  Box,
  Button,
  CurrentUserNav,
  CurrentUserNavProps,
  Icon,
} from '@adminjs/design-system';
import {
  ReduxState,
  ViewHelpers,
  useNavigationResources,
  useTranslation,
} from 'adminjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from '../assets/Navigation.jsx';

const h = new ViewHelpers();

const TopBar: React.FC = () => {
  const session = useSelector((state: ReduxState) => state.session);
  const branding = useSelector((state: ReduxState) => state.branding);
  const { logo, companyName } = branding;

  const { tb } = useTranslation();

  const dropActions: CurrentUserNavProps['dropActions'] = [
    { label: tb('logout'), href: h.logoutUrl(), icon: 'LogOut' },
  ];

  return (
    <Box
      flex
      flexDirection="row"
      alignItems="center"
      height="navbarHeight"
      bg="container"
    >
      <Box as="a" href={h.dashboardUrl()} mx="xl">
        {logo ? <img src={logo} alt={companyName} /> : <h1>{companyName}</h1>}
      </Box>
      <Navigation />
      <Box as="div" flex flexGrow={1} />
      {session && (
        <CurrentUserNav
          name={session.email}
          title={session.title}
          avatarUrl={session.avatarUrl}
          dropActions={dropActions}
        />
      )}
    </Box>
  );
};

export default TopBar;
