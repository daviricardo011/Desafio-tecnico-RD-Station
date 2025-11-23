import axios from 'axios';
import { delay } from '../utils';

const baseURL = 'http://localhost:3001';

export const ProductsService = {
  async getProducts() {
    try {
      await delay();
      const response = await axios.get(`${baseURL}/products`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter os produtos:', error);
      throw error;
    }
  },
};
