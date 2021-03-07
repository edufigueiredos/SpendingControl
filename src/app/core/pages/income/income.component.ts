import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IncomeFormComponent } from 'src/app/shared/components/income-form/income-form.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ButtonModalModel } from 'src/app/shared/models/button-modal.model';
import { IncomeModel } from 'src/app/shared/models/income.model';
import { IncomeService } from 'src/app/shared/services/income-service/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {
  @ViewChild('incomeForm', { static: true }) incomeForm: IncomeFormComponent;
  @ViewChild('modalDeleteIncome', { static: true }) modalDeleteIncome: ModalComponent;
  primaryButton: ButtonModalModel = {
    label: 'Apagar',
    enabled: true,
    action: () => this.deleteIncome()
  };

  incomeToDelete: IncomeModel;

  listOfIncomes: IncomeModel[] = [];
  unsubscribe$: Subject<any> = new Subject<any>();
  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.incomeService.getIncome()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((income: IncomeModel[]) => this.listOfIncomes = income);
  }

  addIncome() {
    this.incomeForm.open();
  }

  editIncome(income: IncomeModel) {
    this.incomeForm.editIncome(income);
  }

  openDeleteIncomeModal(income: IncomeModel) {
    this.incomeToDelete = income;
    this.modalDeleteIncome.open();
  }

  deleteIncome() {
    this.incomeService.deleteIncome(this.incomeToDelete).subscribe({
      complete: () => this.modalDeleteIncome.close(),
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
