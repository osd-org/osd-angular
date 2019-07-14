import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSliderMobileComponent } from './home-slider-mobile.component';
import { HomeSliderMobileSlideComponent } from './home-slider-mobile-slide/home-slider-mobile-slide.component';

@NgModule({
  declarations: [
    HomeSliderMobileComponent,
    HomeSliderMobileSlideComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeSliderMobileComponent,
    HomeSliderMobileSlideComponent
  ]
})
export class HomeSliderMobileModule { }
