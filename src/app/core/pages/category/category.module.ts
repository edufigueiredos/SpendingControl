import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SquareContainerModule } from 'src/app/shared/components/square-container/square-container.module';
import { CategoryFormModule } from 'src/app/shared/components/category-form/category-form.module';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatIconModule,
    MatButtonModule,
    SquareContainerModule,
    CategoryFormModule,
    ModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryModule { }
