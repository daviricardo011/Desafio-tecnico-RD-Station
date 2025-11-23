import { ErrorMessage } from '../shared/ErrorMessage';
import { Loader } from '../shared/Loader';
import { EmptyList } from './EmptyList';
import { RecommendationItem } from './RecommendationItem';

export function RecommendationList({
  recommendations,
  isLoading = false,
  errorRecommendations,
}) {
  let content;

  if (isLoading) {
    content = <Loader text={'Carregando recomendações'} />;
  } else if (recommendations.length === 0) {
    content = <EmptyList />;
  } else {
    content = (
      <ul className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <RecommendationItem
            key={recommendation.id || index}
            recommendation={recommendation}
            index={index}
          />
        ))}
      </ul>
    );
  }

  if (errorRecommendations) {
    return (
      <ErrorMessage
        message={`Erro ao buscar recomendações: ${errorRecommendations}`}
      />
    );
  }

  return (
    <div className="pt-4 md:pt-0">
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações</h2>
      {content}
    </div>
  );
}
