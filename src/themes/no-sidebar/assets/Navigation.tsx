import {
  Button,
  DropDown,
  DropDownItem,
  DropDownMenu,
  DropDownTrigger,
  Icon,
  NavigationElementWithChildrenProps,
} from '@adminjs/design-system';
import { ReduxState, useNavigationResources } from 'adminjs';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

const NavigationComponent: FC = () => {
  const resources = useSelector((state: ReduxState) => state.resources);
  const navigatonElements = useNavigationResources(resources);

  console.log(navigatonElements);

  return (
    <>
      {navigatonElements.map(element => (
        <DropDown key={element.label}>
          <DropDownTrigger>
            <Button color="text">
              <Icon icon={element.icon} />
              {element.label}
            </Button>
          </DropDownTrigger>
          <DropDownMenu>
            <NavigationElement key={element.href} element={element} />
          </DropDownMenu>
        </DropDown>
      ))}
    </>
  );
};

const NavigationElement: FC<{
  element: NavigationElementWithChildrenProps;
}> = ({ element }) => (
  <DropDownItem>
    <Icon icon={element.icon} />
    {element.label}
    {element.elements && (
      <DropDownMenu>
        {element.elements.map(nested => (
          <NavigationElement key={nested.href} element={nested} />
        ))}
      </DropDownMenu>
    )}
  </DropDownItem>
);

export const Navigation = React.memo(NavigationComponent);
