import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

function clicksToNextPokemon({ buttonProximoPokemon, clicks }) {
  for (let i = 0; i < clicks; i += 1) {
    userEvent.click(buttonProximoPokemon);
  }
}

describe('teste do requisito 5', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const heading = screen.getByText('Encountered pokémons');

    expect(heading).toBeInTheDocument();
  });
});

it('Exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
  renderWithRouter(<App />);

  const buttonProximoPokemon = screen.getByTestId('next-pokemon',
    { name: 'Próximo pokémon' });

  expect(buttonProximoPokemon).toHaveTextContent('Próximo pokémon');

  userEvent.click(buttonProximoPokemon);

  expect(screen.getByText('Charmander')).toBeInTheDocument();

  const clicksOnButtonProximoPokemon = 1;

  const pokemonsClicks = {
    buttonProximoPokemon, clicks: pokemons.length - clicksOnButtonProximoPokemon,
  };

  clicksToNextPokemon(pokemonsClicks);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});

it('É mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<App />);

  const onlyOnePokemon = screen.getAllByTestId('pokemon-name');

  expect(onlyOnePokemon.length).toBe(1);
});

it('A Pokédex tem os botões de filtro.', () => {
  renderWithRouter(<App />);

  const typesOfPokemons = 7;

  const pokemonsButtons = screen.getAllByTestId('pokemon-type-button');
  expect(pokemonsButtons).toHaveLength(typesOfPokemons);

  userEvent.click(pokemonsButtons[1]);
  expect(pokemonsButtons[1]).toHaveTextContent('Fire');

  let type = screen.getByTestId('pokemon-type');
  expect(type).toHaveTextContent('Fire');

  const buttonProximoPokemon = screen.getByTestId('next-pokemon');
  userEvent.click(buttonProximoPokemon);
  type = screen.getByTestId('pokemon-type');
  expect(type).toHaveTextContent('Fire');
});

it('A Pokédex contém um botão para resetar o filtro.', () => {
  renderWithRouter(<App />);

  const buttonFilter = screen.getByRole('button', { name: /all/i });
  const buttonProximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(buttonFilter);

  expect(buttonProximoPokemon).toBeEnabled();
});
