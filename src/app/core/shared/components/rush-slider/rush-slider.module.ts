import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RushSliderComponent } from './rush-slider.component';
import { RushSlideComponent } from './rush-slide/rush-slide.component';

@NgModule({
  declarations: [RushSliderComponent, RushSlideComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RushSliderComponent,
    RushSlideComponent
  ]
})
export class RushSliderModule { }
