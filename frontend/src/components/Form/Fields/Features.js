import { useState } from 'react';
import { Checkbox } from '../../shared/Checkbox';
import { SectionWrapper } from '../../Containers/SectionWrapper';

export function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <SectionWrapper title="Funcionalidades:">
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index}>
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
            >
              {feature}
            </Checkbox>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
