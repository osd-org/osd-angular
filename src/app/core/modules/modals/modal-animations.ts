import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({
    opacity: 0,
  })),
  transition('void <=> *', animate('0.2s ease-out'))
]);

export const showHide = trigger('showHide', [
  state('void', style({
    opacity: 0.8,
    transform: 'scale(0.1)'
  })),
  transition('void <=> *', animate('0.1s ease-out'))
]);