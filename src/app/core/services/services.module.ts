import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '@osd-services/api.service';
import { PlatformService } from '@osd-services/universal/platform.service';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        PlatformService,
        CookieService,
        DeviceDetectorService
    ]
  })
  export class ServicesModule {}
