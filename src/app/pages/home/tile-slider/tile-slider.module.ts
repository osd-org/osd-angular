import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileSliderComponent } from './tile-slider.component';
import { TileSlideComponent } from './tile-slide/tile-slide.component';

@NgModule({
  declarations: [
    TileSliderComponent,
    TileSlideComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TileSliderComponent,
    TileSlideComponent
  ]
})
export class TileSliderModule { }
