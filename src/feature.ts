import { buildFeature, FeatureType } from 'adminjs';

const feature = (): FeatureType => {
  return buildFeature({
    actions: {
      someAction: {},
    },
  });
};

export default feature;
