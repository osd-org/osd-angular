import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from '@osd-pipes/sanitize-html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SanitizeHtmlPipe
  ],
  exports: [
    SanitizeHtmlPipe
  ]
})
export class PipesModule { }
