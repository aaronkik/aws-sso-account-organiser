import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Input from './input';

describe('Input', () => {
  test('matches snapshot', () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });
});
