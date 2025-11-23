import { RecommendationService } from './recommendation.service.js';
import { matchesFilter, calculateScore } from './recommendation.helpers.js';
import { mockProducts } from '../mocks/mockProducts.js';

describe('RecommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = RecommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = RecommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = RecommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = RecommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Deve retornar um array vazio quando a lista de produtos é nula ou vazia', () => {
    const formData = {};

    const recommendationsEmpty = RecommendationService.getRecommendations(
      formData,
      []
    );
    expect(recommendationsEmpty).toHaveLength(0);
  });

  test('Deve retornar todos os produtos quando nenhuma preferência e nenhuma feature são selecionadas', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = RecommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(4);
    expect(recommendations.map((p) => p.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
      'RD Conversas',
      'RD Mentor AI',
    ]);
  });

  test('Deve retornar um array vazio quando as seleções não correspondem a nenhum produto', async () => {
    const formData = {
      selectedPreferences: ['Relatórios avançados de desempenho de vendas'],
      selectedFeatures: [
        'Análise de retorno sobre investimento (ROI) de campanhas',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = await RecommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
    expect(recommendations).toEqual([]);
  });
});

describe('Recommendation Helpers (Filtro)', () => {
  const mockProduct = {
    preferences: ['P1', 'P2', 'P3'],
    features: ['F1', 'F2', 'F3'],
  };

  test('Deve retornar TRUE se o produto tiver pelo menos uma Preferência E uma Feature (OR + OR)', () => {
    expect(matchesFilter(mockProduct, ['P2'], ['F3'])).toBe(true);
  });

  test('Deve retornar TRUE se apenas Features forem selecionadas e houver match', () => {
    expect(matchesFilter(mockProduct, [], ['F1'])).toBe(true);
  });

  test('Deve retornar TRUE se apenas Preferências forem selecionadas e houver match', () => {
    expect(matchesFilter(mockProduct, ['P3'], [])).toBe(true);
  });

  test('Deve retornar FALSE se houver match na preferência mas falha na feature', () => {
    expect(matchesFilter(mockProduct, ['P1'], ['F99'])).toBe(false);
  });

  test('Deve retornar FALSE se houver match na feature mas falha na preferência', () => {
    expect(matchesFilter(mockProduct, ['P99'], ['F1'])).toBe(false);
  });

  test('Deve calcular a pontuação corretamente (2 preferências + 1 feature = 3)', () => {
    const selectedPreferences = ['P1', 'P3', 'P99'];
    const selectedFeatures = ['F1', 'F99'];

    const score = calculateScore(
      mockProduct,
      selectedPreferences,
      selectedFeatures
    );
    expect(score).toBe(3);
  });

  test('Deve retornar 0 se não houver match nas preferências e features', () => {
    const selectedPreferences = ['P98', 'P99'];
    const selectedFeatures = ['F98'];
    const score = calculateScore(
      mockProduct,
      selectedPreferences,
      selectedFeatures
    );
    expect(score).toBe(0);
  });

  test('Deve retornar 0 se as listas de seleção estiverem vazias', () => {
    const selectedPreferences = [];
    const selectedFeatures = [];
    const score = calculateScore(
      mockProduct,
      selectedPreferences,
      selectedFeatures
    );
    expect(score).toBe(0);
  });
});
