import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const selectedPokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

describe('teste do requisito 6', () => {
  it('É renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const {
      name,
      type,
      averageWeight: { value, measurementUnit },
      image,
    } = selectedPokemon;

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const selectedImage = screen.getByRole('img');
    expect(selectedImage.src).toBe(image);
    expect(selectedImage.alt).toBe(`${name} sprite`);
  });
});

it('O card contém um link de navegação para exibir detalhes deste Pokémon.', () => {
  renderWithRouter(<App />);

  const cardDetails = screen.getByRole('link', { name: /More Details/i });

  expect(cardDetails.href).toContain(`/pokemons/${selectedPokemon.id}`);
});

it('Ao clicar no link, é redirecionado para a página de detalhes de Pokémon.', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: /More Details/i }));

  expect(screen.getByText(`${selectedPokemon.name} Details`)).toBeInTheDocument();
});

it('A URL exibida no navegador muda para o Pokémon.Id cujos detalhes quer ver;', () => {
  const { history } = renderWithRouter(<App />);

  const detailsUrl = screen.getByRole('link', { name: /More Details/i });
  userEvent.click(detailsUrl);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

it('Existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');

  const clickFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
  userEvent.click(clickFavorite);
  expect(clickFavorite).toBeChecked();

  const detailsUrl = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(detailsUrl).toBeInTheDocument();
  expect(detailsUrl).toHaveAttribute('src', '/star-icon.svg');
});
