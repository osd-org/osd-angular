import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderTextComponent } from './slider-text/slider-text.component';
import { RushSliderModule } from './rush-slider/rush-slider.module';


@NgModule({
  declarations: [
    SliderTextComponent,
],
  imports: [
    CommonModule,
    RushSliderModule
  ],
  exports: [
    SliderTextComponent,
    RushSliderModule
  ]
})
export class ComponentsModule { }
