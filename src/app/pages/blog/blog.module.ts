import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './component/item/item.component';
import { ListComponent } from './component/list/list.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../core/shared/shared.module';

@NgModule({
  declarations: [ItemComponent, ListComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
