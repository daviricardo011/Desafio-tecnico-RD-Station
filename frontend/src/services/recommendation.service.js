import { matchesFilter, calculateScore } from './recommendation.helpers';

export const RecommendationService = {
  getRecommendations(
    formData = {
      selectedRecommendationType: '',
      selectedPreferences: [],
      selectedFeatures: [],
    },
    products
  ) {
    if (!products || products.length === 0) {
      return [];
    }

    const {
      selectedPreferences,
      selectedFeatures,
      selectedRecommendationType,
    } = formData;

    let recommendedProducts = products.filter((product) =>
      matchesFilter(product, selectedPreferences, selectedFeatures)
    );

    if (selectedRecommendationType === 'SingleProduct') {
      if (recommendedProducts.length === 0) return [];

      const bestProduct = recommendedProducts
        .map((product) => ({
          ...product,
          score: calculateScore(product, selectedPreferences, selectedFeatures),
        }))
        .sort((a, b) => b.score - a.score || b.id - a.id)[0];

      const { score, ...cleanProduct } = bestProduct;
      return [cleanProduct];
    }

    return recommendedProducts;
  },
};
