import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do requisito 2', () => {
  it('A página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'About' }));

    const aboutTitle = screen.getByRole('heading',
      { level: 2 });

    expect(aboutTitle).toHaveTextContent('About Pokédex');
  });
});

it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: 'About' }));

  expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  expect(screen.getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
});

it('A página contém a seguinte imagem de uma Pokédex.', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: 'About' }));
  const image = screen.getByRole('img');
  const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(image.src).toBe(imageUrl);
});
