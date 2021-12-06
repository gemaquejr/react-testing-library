import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do requisito 3', () => {
  it('Exibido na tela: No favorite pokemon found, se não ter pokémons favoritos.', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const message = screen.getByText('No favorite pokemon found');

    expect(message).toBeInTheDocument();
  });
});

it('É exibido todos os cards de pokémons favoritados.', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: 'More details' }));
  userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
  userEvent.click(screen.getByTestId('pokemon-name', { name: 'Pikachu' }));

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});
