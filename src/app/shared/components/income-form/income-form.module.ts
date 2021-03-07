import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IncomeFormComponent } from './income-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [IncomeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [IncomeFormComponent]
})
export class IncomeFormModule { }
