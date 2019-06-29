import { ModalsModule } from './../core/modules/modals/modals.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page.routing.module';
import { SharedModule } from '../core/shared/shared.module';

@NgModule({
    imports: [
      CommonModule,
      PageRoutingModule,
      SharedModule,
      ModalsModule
    ],
    declarations: [
        PageComponent
    ],
    providers: [

    ]
  })
  export class PagesModule { }
