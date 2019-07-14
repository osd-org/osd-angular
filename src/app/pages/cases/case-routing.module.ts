import { CaseTplGaleryComponent } from './templates/case-tpl-galery/case-tpl-galery.component';
import { CasesTplThirdComponent } from './templates/cases-tpl-third/cases-tpl-third.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {ItemComponent} from './component/item/item.component';
import { ItemNewComponent } from './component/item-new/item-new.component';
const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'galery',
    component: CaseTplGaleryComponent
  },
  {
    path: 'tpl-3',
    component: CasesTplThirdComponent
  },
  {
    path: 'new',
    component: ItemNewComponent
  },
  {
    path: ':slug',
    component: ItemNewComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CaseRoutingModule { }
