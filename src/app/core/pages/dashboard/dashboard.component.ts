import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ButtonModalModel } from 'src/app/shared/models/button-modal.model';
import { ButtonSquareContainerModel } from 'src/app/shared/models/square-container.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  leftButton: ButtonSquareContainerModel = {
    action: () => this.modal.open(),
    icon: 'info'
  };

  rightButton: ButtonSquareContainerModel = {
    action: () => console.log('Botão da direita'),
    icon: 'delete'
  };

  primaryButton: ButtonModalModel = {
    action: () => console.log('Botão primário'),
    label: 'Botão primário'
  };

  secondaryButton: ButtonModalModel = {
    action: () => console.log('Botão secundário'),
    label: 'Botão secundário'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
