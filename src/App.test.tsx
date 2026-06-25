import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App'; // 👈 上で作ったAppを呼び出す

describe('画面のテスト', () => {
  it('入力欄に数字を入れたら、画面の文字も変わること', () => {
    // 1. 画面を映し出す
    const { container } = render(<App />);
    
    // 2. 入力欄と、文字を出す場所を探す
    const input = container.querySelector('input');
    const span = container.querySelector('span');

    // 3. 入力欄に「5」と打ち込む
    if (input) {
      fireEvent.change(input, { target: { value: '5' } });
    }

    // 4. 画面の文字が「5」になったかチェック！
    expect(span?.textContent).toBe('5');
  });
});