import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page.component';
import { LangGuard } from '../core/shared/guards/lang.guard';

const routes: Routes = [
    {
      path: '',
      component: PageComponent,
      canActivate: [LangGuard],
      canActivateChild: [LangGuard],
      runGuardsAndResolvers: 'always',
      children: [
        { path: '', loadChildren: './home/home.module#HomeModule' },
        { path: ':lang/blog', loadChildren: './blog/blog.module#BlogModule'},
        { path: ':lang/services', loadChildren: './services/services.module#ServicesModule'},
        { path: ':lang/team', loadChildren: './team/team.module#TeamModule'},
        { path: ':lang', loadChildren: './home/home.module#HomeModule' },
        { path: '**', redirectTo: '/'},
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
    providers: [LangGuard]
  })
  export class PageRoutingModule { }
