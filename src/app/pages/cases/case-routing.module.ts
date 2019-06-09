import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {ItemComponent} from './component/item/item.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':slug',
    component: ItemComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CaseRoutingModule { }
