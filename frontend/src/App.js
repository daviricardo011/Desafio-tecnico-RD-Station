import { Form } from './components/Form/Form';
import { RecommendationList } from './components/RecommendationList/RecommendationList';
import { useRecommendations } from './hooks/useRecommendations';
import { useProducts } from './hooks/useProducts';
import { Loader } from './components/shared/Loader';
import { Divisor } from './components/shared/Divider';

function App() {
  const {
    preferences,
    features,
    products,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useProducts();
  const {
    handleGetRecommendations,
    recommendations,
    isLoading: isLoadingRecommendations,
    error: errorRecommendations,
  } = useRecommendations(products);
  const loadingStyles = 'flex items items-center justify-center';

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-center items-center py-8 px-2 sm:p-8">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl py-8 px-8 sm:p-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800 text-center">
          Recomendador de Produtos RD Station
        </h1>
        <p className="text-base text-gray-700 leading-relaxed">
          Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
          encontrar uma variedade de produtos da RD Station, cada um projetado
          para atender às necessidades específicas do seu negócio. De CRM a
          Marketing, de Conversas a Inteligência Artificial, temos uma solução
          para ajudar você a alcançar seus objetivos. Use o formulário abaixo
          para selecionar suas preferências e funcionalidades desejadas e receba
          recomendações personalizadas de produtos que melhor atendam às suas
          necessidades.
        </p>
        <Divisor />
        <div
          className={
            isLoadingProducts
              ? loadingStyles
              : 'grid grid-cols-1 md:grid-cols-2 gap-12'
          }
        >
          {isLoadingProducts ? (
            <Loader text="Carregando dados de produtos..." />
          ) : (
            <>
              <Form
                handleGetRecommendations={handleGetRecommendations}
                preferences={preferences}
                features={features}
                isLoadingRecommendations={isLoadingRecommendations}
                errorProducts={errorProducts}
              />
              <RecommendationList
                recommendations={recommendations}
                isLoading={isLoadingRecommendations}
                errorRecommendations={errorRecommendations}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
