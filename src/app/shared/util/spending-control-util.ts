export const utilFindIndex = (array: any[], itemToFind: any): number =>
  array.findIndex((auxCategory: any) => auxCategory.id === itemToFind.id);
