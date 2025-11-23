import { useState, useCallback } from 'react';
import { RecommendationService } from '../services/recommendation.service';

export function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetRecommendations = useCallback(
    async (formData) => {
      try {
        setIsLoading(true);
        setError(null);
        const dataRecommendations =
          await RecommendationService.getRecommendations(formData, products);
        setRecommendations(dataRecommendations);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [products]
  );

  return { recommendations, handleGetRecommendations, isLoading, error };
}
