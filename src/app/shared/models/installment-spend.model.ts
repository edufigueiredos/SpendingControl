export interface InstallmentSpendModel {
  id: number;
  name: string;
  cost: number;
  startDate: Date;
  qtyInstallments: number;
  categoryId: number;
  categoryName: string;
}