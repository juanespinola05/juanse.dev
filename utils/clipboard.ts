export const handleCopy = (text: string) => {
  return navigator.clipboard.writeText(text);
};
