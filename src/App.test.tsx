import { render, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('1つ目と2つ目の値を足して3つ目に表示する', () => {
    const { getAllByRole, getByRole } = render(<App />);
    const inputs = getAllByRole('spinbutton');
    const input1 = inputs[0] as HTMLInputElement;
    const input2 = inputs[1] as HTMLInputElement;
    const sumInput = inputs[2] as HTMLInputElement;
    const button = getByRole('button', { name: /合計する/ });

    fireEvent.change(input1, { target: { value: '3' } });
    fireEvent.change(input2, { target: { value: '7' } });
    fireEvent.click(button);

    expect(sumInput.value).toBe('10');
  });

  it('空白は0扱いになる', () => {
    const { container } = render(<App />);
    const inputs = container.querySelectorAll('input');
    const button = within(container).getByRole('button', { name: /合計する/ });

    const input1 = inputs[0] as HTMLInputElement;
    const input2 = inputs[1] as HTMLInputElement;
    const sumInput = inputs[2] as HTMLInputElement;
    fireEvent.change(input1, { target: { value: '' } });
    fireEvent.change(input2, { target: { value: '5' } });
    fireEvent.click(button);

    expect(sumInput.value).toBe('5');
  });
});