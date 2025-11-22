import { useState, useCallback } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = useCallback(
    (formData) => {
      const response = recommendationService.getRecommendations(
        formData,
        products
      );
      setRecommendations(response);
    },
    [products]
  );

  return { recommendations, handleGetRecommendations };
}

export default useRecommendations;
