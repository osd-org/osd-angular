import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { SharedModule } from 'app/core/shared/shared.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesDbMonetizationComponent } from './services-db-monetization/services-db-monetization.component';
import { ServicesMarketingIntegrationComponent } from './services-marketing-integration/services-marketing-integration.component';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesListComponent,
    ServicesDbMonetizationComponent,
    ServicesMarketingIntegrationComponent
  ],
  imports: [
    ServicesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ServicesModule { }
