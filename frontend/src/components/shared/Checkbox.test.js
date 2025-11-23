import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  const mockOnChange = jest.fn();

  test('Deve renderizar como um checkbox', () => {
    render(
      <Checkbox
        type="checkbox"
        onChange={mockOnChange}
        data-testid="checkbox-input"
      >
        Opção Check
      </Checkbox>
    );

    const input = screen.getByRole('checkbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  test('Deve renderizar como um radio', () => {
    render(
      <Checkbox type="radio" onChange={mockOnChange} data-testid="radio-input">
        Opção Radio
      </Checkbox>
    );

    const input = screen.getByRole('radio');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'radio');
  });

  test('Deve chamar o onChange quando o input é clicado', () => {
    render(<Checkbox onChange={mockOnChange}>Click Me</Checkbox>);

    fireEvent.click(screen.getByText('Click Me'));

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
