export interface IncomeModel {
  id: number;
  name: string;
  dateOfReceive: Date;
  incomeType: TypeOfIncomeEnum;
}

export interface IncomeTypeModel {
  id: number;
  qtyOfInstallments: number
}

export enum TypeOfIncomeEnum {
  fixed,
  once,
  installment
}