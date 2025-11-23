import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm', () => {
  const defaultState = {
    selectedPreferences: ['Teste'],
    selectedFeatures: [],
    selectedRecommendationType: 'MultipleProducts',
    testString: 'test',
  };

  test('Deve inicializar o formData com o estado inicial fornecido', () => {
    const { result } = renderHook(() => useForm(defaultState));

    expect(result.current.formData).toEqual(defaultState);
  });

  test('Deve atualizar um campo de string corretamente usando handleChange', () => {
    const { result } = renderHook(() => useForm(defaultState));

    const newValue = 'SingleProduct';

    act(() => {
      result.current.handleChange('selectedRecommendationType', newValue);
    });

    expect(result.current.formData.selectedRecommendationType).toBe(newValue);
    expect(result.current.formData.testString).toBe('test');
  });

  test('Deve substituir um campo de array corretamente (simulando seleção de múltiplas preferências)', () => {
    const { result } = renderHook(() => useForm(defaultState));

    const newPreferences = ['Teste1', 'Teste2', 'Teste3'];

    act(() => {
      result.current.handleChange('selectedPreferences', newPreferences);
    });

    expect(result.current.formData.selectedPreferences).toEqual(newPreferences);
  });

  test('Deve permitir a atualização de um campo para um array vazio', () => {
    const { result } = renderHook(() => useForm(defaultState));

    act(() => {
      result.current.handleChange('selectedFeatures', []);
    });

    expect(result.current.formData.selectedFeatures).toEqual([]);
    expect(result.current.formData.selectedRecommendationType).toBe(
      'MultipleProducts'
    );
  });
});
