import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals.component';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { PhotoModalComponent } from './photo-modal/photo-modal.component';

@NgModule({
  declarations: [
    ModalsComponent,
    BaseModalComponent,
    PhotoModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: [
    ModalsComponent,
    BrowserAnimationsModule,
  ]
})
export class ModalsModule { }
