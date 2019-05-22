import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DirectivesModule} from '@osd-directives/directives.module';
import {LayoutsModule} from './layouts/layouts.module';
import {PipesModule} from '@osd-pipes/pipes.module';
import {FormsModule} from '@angular/forms';
import { TranslationModule } from './translation/translation.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
  ],
  declarations: []
})
export class SharedModule { }
