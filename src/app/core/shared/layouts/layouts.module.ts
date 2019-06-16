import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponentsModule} from './layout-components/layout-components.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlogItemLayoutComponent } from './blog-layout/item/blog-item-layout.component';
import { BlogListLayoutComponent } from './blog-layout/list/blog-list-layout.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';

@NgModule({
  declarations: [
    BlogItemLayoutComponent,
    BlogListLayoutComponent,
    MainLayoutComponent,
    PageLayoutComponent
],
  imports: [
    CommonModule,
    LayoutComponentsModule
  ],
  exports: [
    LayoutComponentsModule,
    MainLayoutComponent,
    BlogItemLayoutComponent,
    BlogListLayoutComponent,
    PageLayoutComponent
  ]
})
export class LayoutsModule { }
