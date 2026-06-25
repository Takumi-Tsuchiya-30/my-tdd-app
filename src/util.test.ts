import { describe, it, expect } from 'vitest';
import { validateTask } from './util'; // 👈 まだ存在しないファイルをインポートしています

describe('validateTaskのテスト', () => {
  it('空文字の場合はfalseを返すこと', () => {
    expect(validateTask('')).toBe(false);
  });
  // 👇 ここから追加
  it('スペースだけの場合はfalseを返すこと', () => {
    expect(validateTask('   ')).toBe(false);
  });
});