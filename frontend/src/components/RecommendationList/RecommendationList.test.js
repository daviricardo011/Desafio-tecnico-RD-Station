import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecommendationList } from './RecommendationList';

jest.mock('../shared/Loader', () => ({
  Loader: ({ text }) => <div data-testid="loader-mock">{text}</div>,
}));
jest.mock('./EmptyList', () => ({
  EmptyList: () => <div data-testid="empty-list-mock" />,
}));
jest.mock('../shared/ErrorMessage', () => ({
  ErrorMessage: ({ message }) => (
    <div data-testid="error-message-mock">{message}</div>
  ),
}));
jest.mock('./RecommendationItem', () => ({
  RecommendationItem: ({ recommendation }) => (
    <li data-testid="item-mock">{recommendation.name}</li>
  ),
}));

describe('RecommendationList', () => {
  const mockRecs = [
    { id: 1, name: 'Produto 1', preferences: [], features: [] },
    { id: 2, name: 'Produto 2', preferences: [], features: [] },
  ];

  test('Deve renderizar o ErrorMessage quando houver errorRecommendations', () => {
    const errorMessage = 'Falha de cálculo';
    render(
      <RecommendationList
        recommendations={mockRecs}
        isLoading={false}
        errorRecommendations={errorMessage}
      />
    );

    expect(screen.getByTestId('error-message-mock')).toBeInTheDocument();
    expect(screen.getByTestId('error-message-mock')).toHaveTextContent(
      `Erro ao buscar recomendações: ${errorMessage}`
    );

    expect(screen.queryByTestId('loader-mock')).not.toBeInTheDocument();
  });

  test('Deve renderizar o Loader quando isLoading for true', () => {
    render(
      <RecommendationList
        recommendations={[]}
        isLoading={true}
        errorRecommendations={null}
      />
    );

    expect(screen.getByTestId('loader-mock')).toBeInTheDocument();
    expect(screen.getByTestId('loader-mock')).toHaveTextContent(
      'Carregando recomendações'
    );
    expect(screen.queryByTestId('empty-list-mock')).not.toBeInTheDocument();
  });

  test('Deve renderizar o EmptyList quando recommendations for vazia e não estiver carregando', () => {
    render(
      <RecommendationList
        recommendations={[]}
        isLoading={false}
        errorRecommendations={null}
      />
    );

    expect(screen.getByTestId('empty-list-mock')).toBeInTheDocument();
  });

  test('Deve renderizar a lista de recomendações quando houver produtos', () => {
    render(
      <RecommendationList
        recommendations={mockRecs}
        isLoading={false}
        errorRecommendations={null}
      />
    );

    expect(
      screen.getByRole('heading', { name: /Lista de Recomendações/i })
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('item-mock')).toHaveLength(mockRecs.length);
  });
});
