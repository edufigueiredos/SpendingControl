import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './income.component';
import { IncomeFormModule } from 'src/app/shared/components/income-form/income-form.module';
import { MatButtonModule } from '@angular/material/button';
import { SquareContainerModule } from 'src/app/shared/components/square-container/square-container.module';
import { MatIconModule } from '@angular/material/icon';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';


@NgModule({
  declarations: [IncomeComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    IncomeFormModule,
    ModalModule,
    SquareContainerModule,
    MatIconModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeModule { }
