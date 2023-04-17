import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import FormErrorMessage from './form-error-message';

describe('FormErrorMessage', () => {
  test('matches snapshot', () => {
    const { container } = render(<FormErrorMessage>This is a form error message</FormErrorMessage>);
    expect(container).toMatchSnapshot();
  });

  test('has a role of alert', () => {
    render(<FormErrorMessage>This is a form error message</FormErrorMessage>);
    const formErrorMessage = screen.getByTestId('form-error-message');
    expect(formErrorMessage).toHaveAttribute('role', 'alert');
  });

  test('renders children', () => {
    render(<FormErrorMessage>This is a form error message</FormErrorMessage>);
    const formErrorMessage = screen.getByTestId('form-error-message');
    expect(formErrorMessage).toHaveTextContent('This is a form error message');
  });
});
