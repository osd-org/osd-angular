import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './component/item/item.component';
import { ListComponent } from './component/list/list.component';
import { CaseRoutingModule } from './case-routing.module';
import { SharedModule } from '../../core/shared/shared.module';
import { CaseTplSecondComponent } from './templates/case-tpl-second/case-tpl-second.component';
import { CasesTplThirdComponent } from './templates/cases-tpl-third/cases-tpl-third.component';

@NgModule({
  declarations: [ItemComponent, ListComponent, CaseTplSecondComponent, CasesTplThirdComponent],
  imports: [
    CommonModule,
    CaseRoutingModule,
    SharedModule
  ]
})
export class CaseModule { }
