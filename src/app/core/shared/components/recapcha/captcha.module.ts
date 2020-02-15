import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReCaptcha2Component } from './components/recaptcha-2.component';
import { ScriptService } from './services/script.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ReCaptcha2Component,
  ],
  providers: [
    ScriptService,
  ],
  exports: [
    ReCaptcha2Component,
  ]
})
export class CaptchaModule {
}
