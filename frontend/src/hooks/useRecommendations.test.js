import { renderHook, act, waitFor } from '@testing-library/react';
import { useRecommendations } from './useRecommendations';
import { RecommendationService } from '../services/recommendation.service';
import { mockProducts } from '../mocks/mockProducts.js';

jest.mock('../services/recommendation.service', () => ({
  RecommendationService: {
    getRecommendations: jest.fn(),
  },
}));

describe('useRecommendations', () => {
  const mockFormData = {
    selectedPreferences: ['P1'],
    selectedFeatures: ['F1'],
    selectedRecommendationType: 'SingleProduct',
  };
  const mockRecs = [{ id: 1, name: 'Produto A' }];

  test('Deve gerenciar o estado isLoading e popular as recomendações em caso de sucesso', async () => {
    RecommendationService.getRecommendations.mockResolvedValue(mockRecs);
    const { result } = renderHook(() => useRecommendations(mockProducts));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.recommendations).toEqual([]);
    expect(result.current.error).toBe(null);

    act(() => {
      result.current.handleGetRecommendations(mockFormData);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(RecommendationService.getRecommendations).toHaveBeenCalledTimes(1);
    expect(result.current.recommendations).toEqual(mockRecs);
    expect(result.current.error).toBe(null);
  });

  test('Deve capturar e armazenar o estado de erro e definir isLoading como falso em caso de falha', async () => {
    const errorMsg = 'Erro de servidor simulado';

    RecommendationService.getRecommendations.mockRejectedValue(
      new Error(errorMsg)
    );

    const { result } = renderHook(() => useRecommendations(mockProducts));
    act(() => {
      result.current.handleGetRecommendations(mockFormData);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(errorMsg);
    expect(result.current.recommendations).toEqual([]);
  });

  test('Deve chamar o RecommendationService com os produtos fornecidos ao hook', async () => {
    const mockProductsDependency = [{ id: 99, name: 'Dependency Test' }];
    RecommendationService.getRecommendations.mockResolvedValue([]);

    const { result } = renderHook(() =>
      useRecommendations(mockProductsDependency)
    );

    act(() => {
      result.current.handleGetRecommendations(mockFormData);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(RecommendationService.getRecommendations).toHaveBeenCalledWith(
      mockFormData,
      mockProductsDependency
    );
  });
});
