import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do requisito 4', () => {
  it('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const heading = screen.getByRole('heading',
      { name: /Page requested not found Crying emoji/i });

    expect(heading).toBeInTheDocument();
  });
});

it('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/xablau');

  const image = screen.getAllByRole('img');
  const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(image[1].src).toBe(imageUrl);
});
