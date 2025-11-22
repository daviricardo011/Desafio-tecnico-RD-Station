const calculateScore = (product, selectedPreferences, selectedFeatures) => {
  const preferenceMatches = selectedPreferences.reduce((count, pref) => {
    return product.preferences && product.preferences.includes(pref)
      ? count + 1
      : count;
  }, 0);

  const featureMatches = selectedFeatures.reduce((count, feat) => {
    return product.features && product.features.includes(feat)
      ? count + 1
      : count;
  }, 0);

  return preferenceMatches + featureMatches;
};

const getRecommendations = (
  formData = {
    selectedRecommendationType: '',
    selectedPreferences: [],
    selectedFeatures: [],
  },
  products
) => {
  if (!products || products.length === 0) {
    return [];
  }

  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;

  const baseFilter = (product) => {
    const matchesSomePreference =
      selectedPreferences.length === 0
        ? true
        : selectedPreferences.some(
            (pref) => product.preferences && product.preferences.includes(pref)
          );

    const matchesSomeFeature =
      selectedFeatures.length === 0
        ? true
        : selectedFeatures.some(
            (feat) => product.features && product.features.includes(feat)
          );

    return matchesSomePreference && matchesSomeFeature;
  };

  let recommendedProducts = products.filter(baseFilter);

  if (selectedRecommendationType === 'SingleProduct') {
    if (recommendedProducts.length === 0) {
      return [];
    }

    const scoredProducts = recommendedProducts.map((product) => ({
      ...product,
      score: calculateScore(product, selectedPreferences, selectedFeatures),
    }));
    scoredProducts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.id - a.id;
    });

    const topProduct = scoredProducts[0];
    const { score, ...recommendedProduct } = topProduct;
    recommendedProducts = [recommendedProduct];
  }

  return recommendedProducts;
};

export default { getRecommendations };
