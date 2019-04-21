import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HomeSliderSlideGreenComponent } from './home-slider/home-slider-slide-green/home-slider-slide-green.component';
import { HomeSliderSlideBlackComponent } from './home-slider/home-slider-slide-black/home-slider-slide-black.component';
import { TweenMaxSlideComponent } from './home-slider/tween-max-slide/tween-max-slide.component';
const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    }
  ];

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule
    ],
    declarations: [
      HomeComponent,
      HomeSliderComponent,
      HomeSliderSlideGreenComponent,
      HomeSliderSlideBlackComponent,
      TweenMaxSlideComponent,
    ]
  })
  export class HomeModule {
  }
