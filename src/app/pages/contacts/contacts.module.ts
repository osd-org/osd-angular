import { CaptchaModule } from './../../core/shared/components/recapcha/captcha.module';
import { SharedModule } from 'app/core/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  }
];

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CaptchaModule
  ]
})
export class ContactsModule { }
