import { HomeSliderMobileModule } from './home-slider-mobile/home-slider-mobile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';
import { TileSliderModule } from './tile-slider/tile-slider.module';
import { LinksSliderComponent } from './links-slider/links-slider.component';

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
      SharedModule,
      TileSliderModule,
      HomeSliderMobileModule
    ],
    declarations: [
      HomeComponent,
      LinksSliderComponent,
    ]
  })
  export class HomeModule {
  }
