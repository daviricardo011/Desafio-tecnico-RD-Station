import { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { useForm } from '../../hooks/useForm';
import { Divisor } from '../shared/Divider';
import { ErrorMessage } from '../shared/ErrorMessage';

export function Form({
  handleGetRecommendations,
  preferences,
  features,
  isLoadingRecommendations,
  errorProducts,
}) {
  const [isTypeMissing, setIsTypeMissing] = useState(false);
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const isButtonDisabled = isTypeMissing;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.selectedRecommendationType) {
      setIsTypeMissing(true);
      return;
    }
    setIsTypeMissing(false);
    handleGetRecommendations(formData);
  };

  if (errorProducts) {
    return (
      <ErrorMessage message={`Erro ao buscar produtos: ${errorProducts}`} />
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Divisor />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <Divisor />
      <RecommendationType
        hasError={isTypeMissing}
        onRecommendationTypeChange={(selected) => {
          handleChange('selectedRecommendationType', selected);
          setIsTypeMissing(false);
        }}
      />
      <div className="flex justify-center pt-4">
        <SubmitButton
          text="Obter recomendação"
          disabled={isButtonDisabled}
          isLoading={isLoadingRecommendations}
        />
      </div>
    </form>
  );
}

export default Form;
