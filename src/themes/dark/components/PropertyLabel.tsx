import React from 'react';
import DoubleArrow from '@mui/icons-material/DoubleArrow';
import { Label } from '@adminjs/design-system';
import { PropertyLabelProps } from 'adminjs';

const PropertyLabel: React.FC<PropertyLabelProps> = props => {
  const { property, props: labelProps } = props;

  if (property.hideLabel) {
    return null;
  }

  return (
    <Label
      htmlFor={property.path}
      required={property.isRequired}
      {...labelProps}
    >
      <DoubleArrow /> {property.label}
    </Label>
  );
};

export default PropertyLabel;
