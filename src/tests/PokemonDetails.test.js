import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { readFavoritePokemonIds } from '../services/pokedexService';
import data from '../data';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return { ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
    };
  };

  test('Contém informações do Pokemon', () => {
    const { history } = renderWithRouter(<App />);
    data.forEach((pokemon) => {
      const { id, name, summary } = pokemon;
      history.push(`/pokemons/${id}`);

      expect(history.location.pathname).toBe(`/pokemons/${id}`);

      const details = screen.getByText(`${name} Details`);
      expect(details).toBeInTheDocument();

      const link = screen.queryByText(/more details/i);
      expect(link).toBeNull();

      const heading = screen.getByRole('heading', { name: /summary/i, level: 2 });
      expect(heading).toBeInTheDocument();

      const summaryText = screen.getByText(summary);
      expect(summaryText).toBeInTheDocument();
    });
  });

  test('Contém os mapas', () => {
    const { history } = renderWithRouter(<App />);
    data.forEach((pokemon) => {
      const { id, name, foundAt } = pokemon;
      history.push(`/pokemons/${id}`);

      const heading = screen.getByRole('heading', { name: `Game Locations of ${name}`,
        level: 2 });
      expect(heading).toBeInTheDocument();

      foundAt.forEach((place) => {
        const locationName = screen.getByText(place.location);
        expect(locationName).toBeInTheDocument();
      });

      const imagesUrls = foundAt.map((place) => place.map);
      const imageElements = screen.getAllByAltText(`${name} location`);
      imageElements.forEach((image) => {
        expect(imagesUrls).toContain(image.src);
      });
    });
  });

  test('É possível favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    data.forEach((pokemon) => {
      const { id } = pokemon;
      history.push(`/pokemons/${id}`);

      const favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
      userEvent.click(favoriteCheckbox);

      expect(readFavoritePokemonIds()).toContain(id);

      userEvent.click(favoriteCheckbox);

      expect(readFavoritePokemonIds()).not.toContain(id);
    });
  });
});
