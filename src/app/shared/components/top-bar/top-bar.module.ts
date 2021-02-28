import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TopBarComponent } from './top-bar.component';
import { ModalModule } from '../modal/modal.module';
import { CategoryFormModule } from '../category-form/category-form.module';



@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CategoryFormModule
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
