
export function utilFindIndex(array: any[], itemToFind: any): number {
  return array.findIndex((auxCategory: any) => auxCategory.id === itemToFind.id);
}