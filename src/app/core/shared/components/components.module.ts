import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderTextComponent } from './slider-text/slider-text.component';


@NgModule({
  declarations: [
    SliderTextComponent,
],
  imports: [
    CommonModule
  ],
  exports: [
    SliderTextComponent,

  ]
})
export class ComponentsModule { }
