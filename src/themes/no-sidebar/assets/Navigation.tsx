import {
  Box,
  Button,
  DropDown,
  DropDownItem,
  DropDownMenu,
  DropDownTrigger,
  Icon,
  NavigationElementWithChildrenProps,
} from '@adminjs/design-system';
import { ReduxState, useNavigationResources } from 'adminjs';
import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const NavigationComponent: FC = () => {
  const resources = useSelector((state: ReduxState) => state.resources);
  const { pathname } = useLocation();
  const navigatonElements = useNavigationResources(resources);

  const isSelected = useCallback(
    ({ href, elements }: NavigationElementWithChildrenProps) =>
      href ? href === pathname : elements?.map(e => e.href).includes(pathname),
    [pathname]
  );

  return (
    <Box as="nav" flex alignItems="center">
      {navigatonElements.map(element => (
        <DropDown key={element.label}>
          <DropDownTrigger>
            <Button color={isSelected(element) ? 'primary' : 'text'}>
              <Icon icon={element.icon} />
              {element.label}
            </Button>
          </DropDownTrigger>
          <DropDownMenu>
            {element.elements?.map(nested => (
              <NavigationElement key={nested.href} element={nested} />
            ))}
          </DropDownMenu>
        </DropDown>
      ))}
    </Box>
  );
};

type NavigationElementProps = { element: NavigationElementWithChildrenProps };

const NavigationElement: FC<NavigationElementProps> = ({
  element: { href, label, icon, elements },
}) => (
  <DropDownItem as="a" href={href}>
    {icon && <Icon icon={icon} />}
    {label}
    {elements?.length ? (
      <DropDownMenu>
        {elements.map(nested => (
          <NavigationElement key={nested.href} element={nested} />
        ))}
      </DropDownMenu>
    ) : null}
  </DropDownItem>
);

export const Navigation = React.memo(NavigationComponent);
