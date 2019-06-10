import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@osd-directives/directives.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PipesModule } from '@osd-pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from './translation/translation.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
    RouterModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCCgsoz9cifBsT4D5gYGvYAWt8bgstA6nQ' // todo: Test Api Key
    })
  ],
  exports: [
    CommonModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
    RouterModule,
    TranslationModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    AgmCoreModule
  ],
  declarations: []
})
export class SharedModule { }
