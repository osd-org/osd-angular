import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@osd-directives/directives.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PipesModule } from '@osd-pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from './translation/translation.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
    RouterModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
    RouterModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: []
})
export class SharedModule { }
