import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the profile setup screen for a first-time visitor', () => {
  render(<App />);
  const heading = screen.getByText(/vamos a personalizar tu michi saving/i);
  expect(heading).toBeInTheDocument();
});
