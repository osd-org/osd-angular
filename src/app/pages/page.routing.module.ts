import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page.component';
import { LangGuard } from '../core/shared/guards/lang.guard';


const routesWithoutLang: Routes = [
  {path: '404', loadChildren: './not-found/not-found.module#NotFoundModule'},
];


const routes: Routes = [
  ...routesWithoutLang,
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
      { path: ':lang/cases', loadChildren: './cases/case.module#CaseModule'},
      { path: ':lang/team', loadChildren: './team/team.module#TeamModule'},
      { path: ':lang/about', loadChildren: './about/about.module#AboutModule'},
      { path: ':lang/contact', loadChildren: './contacts/contacts.module#ContactsModule'},
      { path: ':lang/clients', loadChildren: './clients/clients.module#ClientsModule'},
      // { path: ':lang', loadChildren: './home/home.module#HomeModule' },
      { path: '**', redirectTo: '/404'},
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
