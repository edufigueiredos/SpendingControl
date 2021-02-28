import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { take } from 'rxjs/operators';
import { ActionOnCloseModalModel, ButtonModalModel } from '../../models/button-modal.model';
import { CategoryModel } from '../../models/category.model';
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
  isEdit = false;
  categoryToEdit: CategoryModel;
  categoryForm: FormGroup;
  formValueChanges: Subscription
  payday = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      payday: ['', [Validators.required, Validators.min(1), Validators.max(31)]]
    })
  }

  ngOnInit(): void {
    this.createArrayOfPayday();
  }

  public open() {
    if (this.isEdit) {
      this.primaryButton = { ...this.primaryButton, label: 'Editar' }
    } else {
      this.primaryButton = { ...this.primaryButton, label: 'Cadastrar' };
    }
    this.modalNewCategory.open();
    this.createFormValueChanges();
  }

  public editCategory(category: CategoryModel) {
    this.isEdit = true;
    this.categoryForm.setValue({
      id: category.id,
      name: category.name,
      payday: category.payday
    })
    this.categoryToEdit = category;
    this.open();
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
    this.isEdit = false;
    this.formValueChanges.unsubscribe();
    this.categoryForm.reset();
    this.categoryToEdit = undefined;
    this.primaryButton = { ...this.primaryButton, enabled: false };
  }

  private registerCategory() {
    if (this.categoryForm.valid) {
      if (!this.isEdit) {
        const categoryToRegister: CategoryModel = {
          name: this.categoryForm.get('name').value,
          payday: this.categoryForm.get('payday').value
        }
        this.categoryService.createCategory(categoryToRegister).pipe(take(1))
          .subscribe(() => {
            this.modalNewCategory.close();
            this.resetForm();
          }, (error) => console.log(error));
      } else if (this.categoryToEdit) {
        this.categoryService.updateCategory(this.categoryToEdit.id, this.categoryForm.value)
          .pipe(take(1)).subscribe(() => {
            this.modalNewCategory.close();
            this.isEdit = false;
          }, (error) => console.log(error))
      }
    }
  }

  ngOnDestroy() {
    this.formValueChanges.unsubscribe();
  }

}
