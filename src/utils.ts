export const startsWith = <T>(a: T[], b: T[]): boolean => {
  return b.every((v, i) => a.at(i) === v);
};
