import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { horisontalScrollDirective } from './horizontal-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    horisontalScrollDirective
  ],
  exports: [
    horisontalScrollDirective
  ]
})
export class DirectivesModule { }
