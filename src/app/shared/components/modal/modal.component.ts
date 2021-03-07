import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { modalAnimation } from '../../animations/modal.animation';
import { ActionOnCloseModalModel, ButtonModalModel } from '../../models/button-modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [modalAnimation]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() buttonClose = true;
  @Input() modalTitle: string;
  @Input() primaryButton: ButtonModalModel;
  @Input() secondaryButton: ButtonModalModel;
  @Input() actionOnClose: ActionOnCloseModalModel = {
    action: () => { }
  };
  isHidden = true;
  keydownEvent: Subscription;

  get stateName() {
    return this.isHidden ? 'hidden' : 'show';
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.keydownEvent) {
      this.keydownEvent.unsubscribe();
    }
  }

  public open() {
    this.createKeydownEvent();
    this.isHidden = false;
  }

  public close() {
    this.keydownEvent.unsubscribe();
    this.actionOnClose.action();
    this.isHidden = true;
  }

  public closeOnClickOut(event) {
    if (event.target.classList[0] === 'overlay-modal') {
      this.close();
    }
  }

  private createKeydownEvent() {
    const keydown = fromEvent(document, 'keydown');
    this.keydownEvent = keydown.subscribe((event: KeyboardEvent) => this.closeModalWithEsc(event));
  }

  private closeModalWithEsc(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

}
