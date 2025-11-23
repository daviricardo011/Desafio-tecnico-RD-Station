import { ProductsService } from './product.service.js';
import axios from 'axios';
import { delay } from '../utils';
import { mockProducts } from '../mocks/mockProducts.js';

jest.mock('axios', () => ({
  get: jest.fn(),
}));
jest.mock('../utils', () => ({
  delay: jest.fn(),
}));

describe('ProductsService', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  beforeEach(() => {
    delay.mockResolvedValue();
    jest.clearAllMocks();
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  test('Deve chamar a API com o endpoint correto e retornar os dados de produtos', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    const products = await ProductsService.getProducts();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(products).toEqual(mockProducts);
  });

  test('Deve lançar o erro e logar no console em caso de falha na API', async () => {
    const networkError = new Error('Erro de rede simulado');
    axios.get.mockRejectedValue(networkError);
    await expect(ProductsService.getProducts()).rejects.toThrow(
      'Erro de rede simulado'
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      expect.any(Error)
    );
  });
});
