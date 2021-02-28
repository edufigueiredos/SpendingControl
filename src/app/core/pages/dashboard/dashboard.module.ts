import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { SquareContainerModule } from 'src/app/shared/components/square-container/square-container.module';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SquareContainerModule,
    ModalModule
  ]
})
export class DashboardModule { }
