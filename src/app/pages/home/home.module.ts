import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';
import { TileSliderModule } from './tile-slider/tile-slider.module';

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
      TileSliderModule
    ],
    declarations: [
      HomeComponent,
    ]
  })
  export class HomeModule {
  }
