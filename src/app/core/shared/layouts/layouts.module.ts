import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponentsModule} from './layout-components/layout-components.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlogItemLayoutComponent } from './blog-layout/item/blog-item-layout.component';
import { BlogListLayoutComponent } from './blog-layout/list/blog-list-layout.component';
import { ServicesLayoutComponent } from './services-layout/services-layout.component';
import { TeamLayoutComponent } from './team-layout/team-layout.component';
import { ContactsLayoutComponent } from './contacts-layout/contacts-layout.component';
import { ClientsLayoutComponent } from './clients-layout/clients-layout.component';

@NgModule({
  declarations: [
    BlogItemLayoutComponent,
    BlogListLayoutComponent,
    MainLayoutComponent,
    TeamLayoutComponent,
    ServicesLayoutComponent,
    ContactsLayoutComponent,
    ClientsLayoutComponent
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
    ServicesLayoutComponent,
    TeamLayoutComponent,
    ContactsLayoutComponent,
    ClientsLayoutComponent
  ]
})
export class LayoutsModule { }
