import { ServicesMarketingIntegrationComponent } from './services-marketing-integration/services-marketing-integration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesListComponent } from './services-list/services-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { ServicesDbMonetizationComponent } from './services-db-monetization/services-db-monetization.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        component: ServicesListComponent
      },
      {
        path: 'marketing-integration',
        component: ServicesMarketingIntegrationComponent,
      },
      {
        path: 'db-monetization',
        component: ServicesDbMonetizationComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class ServicesRoutingModule { }
