import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';
import { ProductsService } from '../services/product.service';
import { mockProducts } from '../mocks/mockProducts.js';

jest.mock('../services/product.service', () => ({
  ProductsService: {
    getProducts: jest.fn(),
  },
}));

describe('useProducts', () => {
  const mockSuccessfulFetch = () => {
    ProductsService.getProducts.mockResolvedValue(mockProducts);
  };

  test('Deve buscar produtos, atualizar estados de loading e extrair preferências', async () => {
    mockSuccessfulFetch();
    const { result } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(ProductsService.getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.preferences.length).toBeGreaterThan(0);
    expect(result.current.features.length).toBeGreaterThan(0);
  });

  test('Deve atualizar o estado de erro e definir isLoading como falso em caso de falha na API', async () => {
    const errorMsg = 'Erro de rede ou servidor offline';
    ProductsService.getProducts.mockRejectedValue(new Error(errorMsg));

    const { result } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(errorMsg);
    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
  });
});
