export const validateTask = (text: string): boolean => {
  // .trim() を使うことで、前後の余計なスペースをすべて削り落とします
  if (text.trim() === '') return false;
  return true;
};