import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Button from './button';

describe('Button', () => {
  test('matches snapshot', () => {
    const { container } = render(<Button>This is a button</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders children', () => {
    render(<Button>This is a button</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('This is a button');
  });
});
