import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderTextComponent } from './slider-text/slider-text.component';
import { RushSliderModule } from './rush-slider/rush-slider.module';
import { PipesModule } from '@osd-pipes/pipes.module';
import { BlogTextComponent } from './blog-text/blog-text.component';

@NgModule({
  declarations: [
    SliderTextComponent,
    BlogTextComponent,
],
  imports: [
    CommonModule,
    RushSliderModule,
    PipesModule,
  ],
  exports: [
    SliderTextComponent,
    RushSliderModule,
    BlogTextComponent
  ]
})
export class ComponentsModule { }
