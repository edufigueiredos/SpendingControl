import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActionOnCloseModalModel, ButtonModalModel } from '../../models/button-modal.model';
import { IncomeModel } from '../../models/income.model';
import { IncomeService } from '../../services/income-service/income.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss']
})
export class IncomeFormComponent implements OnInit, OnDestroy {
  @ViewChild('modalNewIncome', { static: true }) modalNewIncome: ModalComponent;

  // Modal Functions
  onCloseModal: ActionOnCloseModalModel = {
    action: () => this.resetForm()
  };
  primaryButton: ButtonModalModel =
    {
      label: 'Cadastrar',
      action: () => this.registerIncome(),
      enabled: false
    };
  secondaryButton: ButtonModalModel =
    {
      label: 'Cancelar',
      action: () => this.closeIncomeForm(),
      enabled: true
    };

  // Category Form Variables
  incomeToEdit: IncomeModel;
  incomeForm: FormGroup;
  formValueChanges: Subscription;
  isEdit = false;
  dayOfReceive: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private incomeService: IncomeService
  ) {
    this.incomeForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(1)]],
      dayOfReceive: ['', [Validators.required, Validators.min(1), Validators.max(31)]]
    });
  }

  ngOnInit(): void {
    this.createArrayOfReceive();
  }

  ngOnDestroy() {
    if (this.formValueChanges) {
      this.formValueChanges.unsubscribe();
    }
  }

  public open() {
    if (this.isEdit) {
      this.primaryButton = { ...this.primaryButton, label: 'Editar' };
    } else {
      this.primaryButton = { ...this.primaryButton, label: 'Cadastrar' };
    }
    this.modalNewIncome.open();
    this.createFormValueChanges();
  }

  public editIncome(income: IncomeModel) {
    this.isEdit = true;
    this.incomeForm.setValue({
      id: income.id,
      name: income.name,
      value: income.value,
      dayOfReceive: income.dayOfReceive
    });

    this.open();
  }

  private registerIncome() {
    if (this.incomeForm.valid) {
      if (!this.isEdit) {
        const incomeToRegister: IncomeModel = {
          name: this.incomeForm.get('name').value,
          value: this.incomeForm.get('value').value,
          dayOfReceive: this.incomeForm.get('dayOfReceive').value,
        };

        this.incomeService.createIncome(incomeToRegister)
          .pipe(take(1)).subscribe(() => {
            this.modalNewIncome.close();
            this.resetForm();
          }, (error) => console.log(error));
      } else {
        const incomeId = this.incomeForm.get('id').value;
        this.incomeService.updateIncome(incomeId, this.incomeForm.value)
        .pipe(take(1)).subscribe(() => {
          this.modalNewIncome.close();
          this.isEdit = false;
        }, (error) => console.log(error));
      }
    }
  }

  private createFormValueChanges() {
    this.formValueChanges = this.incomeForm.statusChanges.subscribe(formValidation => {
      this.primaryButton = { ...this.primaryButton, enabled: (formValidation === 'VALID') };
    });
  }

  private createArrayOfReceive() {
    for (let day = 1; day <= 31; day++) {
      this.dayOfReceive.push(day);
    }
  }

  private closeIncomeForm() {
    this.modalNewIncome.close();
  }

  private resetForm() {
    this.isEdit = false;
    this.formValueChanges.unsubscribe();
    this.incomeForm.reset();
    this.primaryButton = { ...this.primaryButton, enabled: false };
  }

}
