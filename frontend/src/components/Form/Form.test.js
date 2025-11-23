import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

const mockHandleRecommendations = jest.fn();

let mockFormData = {
  selectedRecommendationType: '',
  selectedPreferences: [],
  selectedFeatures: [],
};

jest.mock('../../hooks/useForm', () => ({
  useForm: () => ({
    formData: mockFormData,
    handleChange: (field, value) => {
      mockFormData = { ...mockFormData, [field]: value };
    },
  }),
}));

beforeEach(() => {
  mockFormData = {
    selectedRecommendationType: '',
    selectedPreferences: [],
    selectedFeatures: [],
  };
});

jest.mock('./Fields', () => ({
  Preferences: () => <div data-testid="preferences-mock" />,
  Features: () => <div data-testid="features-mock" />,
  RecommendationType: ({ hasError, onRecommendationTypeChange }) => (
    <div data-testid="rectype-mock">
      {hasError && <p data-testid="error-text">Campo obrigatório</p>}
      <button
        data-testid="rectype-button"
        onClick={() => onRecommendationTypeChange('SingleProduct')}
      />
    </div>
  ),
}));

jest.mock('./SubmitButton', () => ({
  SubmitButton: ({ text, onClick, disabled }) => (
    <button
      data-testid="submit-button-mock"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  ),
}));

jest.mock('../shared/ErrorMessage', () => ({
  ErrorMessage: ({ message }) => (
    <p data-testid="error-message-mock">{message}</p>
  ),
}));

describe('Form', () => {
  const mockProps = {
    handleGetRecommendations: mockHandleRecommendations,
    preferences: ['P1'],
    features: ['F1'],
    isLoadingRecommendations: false,
    errorProducts: null,
  };

  test('Deve renderizar ErrorMessage quando errorProducts for true', () => {
    render(<Form {...mockProps} errorProducts="Erro ao carregar" />);

    expect(screen.getByTestId('error-message-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button-mock')).not.toBeInTheDocument();
  });

  test('Deve bloquear o submit se recommendationType estiver vazio', () => {
    render(<Form {...mockProps} />);

    fireEvent.submit(screen.getByTestId('submit-button-mock'));

    expect(mockHandleRecommendations).not.toHaveBeenCalled();
    expect(screen.getByTestId('error-text')).toBeInTheDocument();
  });
});
