import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page.component';

const routes: Routes = [
    {
      path: '',
      component: PageComponent,
      children: [
        { path: '', loadChildren: './home/home.module#HomeModule' },
      ]
    },
  ];

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ],
    declarations: [],
    providers: []
  })
  export class PageRoutingModule { }
