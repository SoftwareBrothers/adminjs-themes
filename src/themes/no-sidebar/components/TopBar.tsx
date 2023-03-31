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

const h = new ViewHelpers();

const TopBar: React.FC = () => {
  const resources = useSelector((state: ReduxState) => state.resources);
  const session = useSelector((state: ReduxState) => state.session);
  const branding = useSelector((state: ReduxState) => state.branding);
  const { logo, companyName } = branding;

  const elements = useNavigationResources(resources);
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
      {elements.map(element => (
        <Button as="a" href={element.href} color="text" key={element.href}>
          <Icon icon={element.icon} />
          {element.label}
        </Button>
      ))}
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
