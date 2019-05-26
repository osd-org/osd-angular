import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponentsModule} from './layout-components/layout-components.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';

@NgModule({
  declarations: [
    BlogLayoutComponent,
    MainLayoutComponent
],
  imports: [
    CommonModule,
    LayoutComponentsModule
  ],
  exports: [
    LayoutComponentsModule,
    MainLayoutComponent,
    BlogLayoutComponent
  ]
})
export class LayoutsModule { }
