import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do requisito 1', () => {
  it('O topo da aplicação contém um conjunto fixo de 3 links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    const about = screen.getByRole('link', { name: /About/i });
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
});

it('É redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/xablau');

  const notFound = screen.getByRole('heading', { name: /Page requested not found/i });

  expect(notFound).toBeInTheDocument();
});
