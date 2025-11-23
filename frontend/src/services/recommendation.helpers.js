const countMatches = (selected = [], productList = []) =>
  selected.filter((item) => productList.includes(item)).length;

export const calculateScore = (
  product,
  selectedPreferences,
  selectedFeatures
) => {
  return (
    countMatches(selectedPreferences, product.preferences) +
    countMatches(selectedFeatures, product.features)
  );
};

export const matchesFilter = (
  product,
  selectedPreferences,
  selectedFeatures
) => {
  const prefMatch =
    selectedPreferences.length === 0 ||
    selectedPreferences.some((p) => product.preferences?.includes(p));

  const featMatch =
    selectedFeatures.length === 0 ||
    selectedFeatures.some((f) => product.features?.includes(f));

  return prefMatch && featMatch;
};
