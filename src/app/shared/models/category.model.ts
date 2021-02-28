import { FixedSpendModel } from "./fixed-spend.model";
import { InstallmentSpendModel } from "./installment-spend.model";

export interface CategoryModel {
  id?: number;
  name: string;
  payday: number;
  fixedSpends?: FixedSpendModel[];
  installmentSpends?: InstallmentSpendModel[];
}

export interface ShortCategory {
  id?: number;
  name: string;
  payday: number;
}