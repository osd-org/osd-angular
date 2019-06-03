import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponentsModule} from './layout-components/layout-components.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';
import { ServicesLayoutComponent } from './services-layout/services-layout.component';
import { TeamLayoutComponent } from './team-layout/team-layout.component';

@NgModule({
  declarations: [
    BlogLayoutComponent,
    MainLayoutComponent,
    TeamLayoutComponent,
    ServicesLayoutComponent
],
  imports: [
    CommonModule,
    LayoutComponentsModule
  ],
  exports: [
    LayoutComponentsModule,
    MainLayoutComponent,
    BlogLayoutComponent,
    ServicesLayoutComponent,
    TeamLayoutComponent
  ]
})
export class LayoutsModule { }
