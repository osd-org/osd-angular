import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page.routing.module';
import { SharedModule } from '../core/shared/shared.module';

@NgModule({
    imports: [
      CommonModule,
      PageRoutingModule,
      SharedModule
    ],
    declarations: [
        PageComponent
    ],
    providers: [

    ]
  })
  export class PagesModule { }
