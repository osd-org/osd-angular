import { CaseTplSecondComponent } from './templates/case-tpl-second/case-tpl-second.component';
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
    path: 'tpl-2',
    component: CaseTplSecondComponent
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
