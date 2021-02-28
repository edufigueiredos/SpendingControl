import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareContainerComponent } from './square-container.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [SquareContainerComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [SquareContainerComponent]
})
export class SquareContainerModule { }
