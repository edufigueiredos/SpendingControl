import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryFormComponent } from 'src/app/shared/components/category-form/category-form.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ButtonModalModel } from 'src/app/shared/models/button-modal.model';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { CategoryService } from '../../../shared/services/category-service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('categoryForm', { static: true }) categoryForm: CategoryFormComponent;
  @ViewChild('deleteCategoryModal', { static: true }) deleteCategoryModal: ModalComponent;
  public buttonDeleteCategory: ButtonModalModel = {
    label: 'Apagar',
    enabled: true,
    action: () => this.deleteCategory()
  };

  public listOfCategories: CategoryModel[] = [];
  public categoryToDelete: CategoryModel;
  private unsubscribe$ = new Subject<any>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(categories => this.listOfCategories = categories);
  }

  addCategory() {
    this.categoryForm.open();
  }

  editCategory(category: CategoryModel) {
    this.categoryForm.editCategory(category);
  }

  openDeleteCategoryModal(category: CategoryModel) {
    this.categoryToDelete = category;
    this.deleteCategoryModal.open();
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryToDelete).subscribe({
      complete: () => this.deleteCategoryModal.close(),
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
