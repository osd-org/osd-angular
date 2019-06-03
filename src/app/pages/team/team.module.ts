import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { SharedModule } from '../../core/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
  }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule,
    ],
    declarations: [
      TeamComponent
    ],
    providers: [

    ]
  })
  export class TeamModule { }
