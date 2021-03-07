import {
  trigger,
  animate,
  state,
  style,
  transition,
  keyframes
} from '@angular/animations';

export const modalAnimation = [
  trigger('openModalAndClose', [
    state('hidden', style({
      display: 'none',
      opacity: 0
    })),
    state('show', style({
      display: 'block',
      opacity: 1
    })),
    transition('hidden => show',
      animate('70ms', keyframes([
        style({ display: 'block', offset: 0 }),
        style({ opacity: 0, offset: 0.1 }),
        style({ opacity: 1, offset: 1.0 }),
      ]))),
    transition('show => hidden',
      animate('70ms', keyframes([
        style({ opacity: 1, offset: 0 }),
        style({ opacity: 0, offset: 0.9 }),
        style({ display: 'none', offset: 1 }),
      ]))),
  ])
];
