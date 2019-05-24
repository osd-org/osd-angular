import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagesModule} from './pages/pages.module';
import {PageComponent} from './pages/page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled'
    }),
    PagesModule
   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
