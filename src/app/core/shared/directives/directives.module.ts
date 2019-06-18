import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { horisontalScrollDirective } from './horizontal-scroll.directive';
import { CountUpDirective } from './countUp/count-up.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    horisontalScrollDirective,
    CountUpDirective
  ],
  exports: [
    horisontalScrollDirective,
    CountUpDirective
  ]
})
export class DirectivesModule { }
