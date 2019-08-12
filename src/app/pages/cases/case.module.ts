import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './component/item/item.component';
import { ListComponent } from './component/list/list.component';
import { CaseRoutingModule } from './case-routing.module';
import { SharedModule } from '../../core/shared/shared.module';
import { CaseTplFirstComponent } from './templates/case-tpl-first/case-tpl-first.component';
import { CaseTplSecondComponent } from './templates/case-tpl-second/case-tpl-second.component';
import { CasesTplThirdComponent } from './templates/cases-tpl-third/cases-tpl-third.component';
import { CaseTplGaleryComponent } from './templates/case-tpl-galery/case-tpl-galery.component';
import { CaseTplFifthComponent } from './templates/case-tpl-fifth/case-tpl-fifth.component';
import { CaseTplFourthComponent } from './templates/case-tpl-fourth/case-tpl-fourth.component';
import { CaseTplSeventhComponent } from './templates/case-tpl-seventh/case-tpl-seventh.component';
import { CaseTplMailComponent } from './templates/case-tpl-mail/case-tpl-mail.component';
import { CaseTplMailOnePhotoComponent } from './templates/case-tpl-mail-one-photo/case-tpl-mail-one-photo.component';
import { CaseTplResultsComponent } from './templates/case-tpl-results/case-tpl-results.component';
import { CaseTplImagesComponent } from './templates/case-tpl-images/case-tpl-images.component';

@NgModule({
  declarations: [
    ItemComponent,
    ListComponent,
    CaseTplSecondComponent,
    CasesTplThirdComponent,
    CaseTplGaleryComponent,
    CaseTplFifthComponent,
    CaseTplFourthComponent,
    CaseTplSeventhComponent,
    CaseTplFirstComponent,
    CaseTplMailComponent,
    CaseTplMailOnePhotoComponent,
    CaseTplResultsComponent,
    CaseTplImagesComponent
  ],
  imports: [
    CommonModule,
    CaseRoutingModule,
    SharedModule
  ]
})
export class CaseModule { }
