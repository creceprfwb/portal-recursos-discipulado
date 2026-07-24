import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Portal de recursos', () => {
  it('muestra el encabezado principal', () => {
    render(<App />);
    expect(screen.getByText(/Recursos de discipulado para la iglesia/i)).toBeInTheDocument();
  });

  it('permite buscar recursos públicos', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/Título, tema o autor/i);
    await user.type(input, 'oración');

    expect(screen.getByText(/Oración y silencio espiritual/i)).toBeInTheDocument();
  });
});
