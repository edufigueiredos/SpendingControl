import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { take } from 'rxjs/operators';
import { ActionOnCloseModalModel, ButtonModalModel } from '../../models/button-modal.model';
import { CategoryService } from '../../services/category.service';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @ViewChild('modalNewCategory', { static: true }) modalNewCategory: ModalComponent;
  onCloseModal: ActionOnCloseModalModel = {
    action: () => this.resetForm()
  }
  primaryButton: ButtonModalModel = {
    label: 'Cadastrar',
    action: () => this.registerCategory(),
    enabled: false
  };
  secondaryButton: ButtonModalModel = {
    label: 'Cancelar',
    action: () => this.closeCategoryForm()
  };
  categoryForm: FormGroup;
  formValueChanges: Subscription
  payday = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      payday: ['', [Validators.required, Validators.min(1), Validators.max(31)]]
    })
  }

  ngOnInit(): void {
    this.createArrayOfPayday();
  }

  public open() {
    this.modalNewCategory.open();
    this.createFormValueChanges();
  }

  private createFormValueChanges() {
    this.formValueChanges = this.categoryForm.statusChanges.subscribe(formValidation => {
      this.primaryButton = { ...this.primaryButton, enabled: (formValidation === 'VALID') };
    });
  }

  private createArrayOfPayday() {
    for (let day = 1; day <= 31; day++) {
      this.payday.push(day);
    }
  }

  private closeCategoryForm() {
    this.modalNewCategory.close();
  }

  private resetForm() {
    this.formValueChanges.unsubscribe();
    this.categoryForm.reset();
    this.primaryButton = { ...this.primaryButton, enabled: false };
  }

  private registerCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).pipe(take(1)).subscribe(category => {
        console.log(category)
      }, (error) => console.log(error));
    }
  }

  ngOnDestroy() {
    this.formValueChanges.unsubscribe();
  }

}
