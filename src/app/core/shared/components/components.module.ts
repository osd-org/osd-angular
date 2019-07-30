import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RushSliderModule } from './rush-slider/rush-slider.module';
import { PipesModule } from '@osd-pipes/pipes.module';
import { BlogTextComponent } from './blog-text/blog-text.component';

@NgModule({
  declarations: [
    BlogTextComponent,
],
  imports: [
    CommonModule,
    RushSliderModule,
    PipesModule,
  ],
  exports: [
    RushSliderModule,
    BlogTextComponent
  ]
})
export class ComponentsModule { }
