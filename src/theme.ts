import { buildFeature, FeatureType } from 'adminjs';

const theme = (): any => {
  return buildFeature({
    actions: {
      theme: {

      },
    },
  });
};

export default theme;
