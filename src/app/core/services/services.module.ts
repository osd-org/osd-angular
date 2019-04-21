import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ApiService} from '@osd-services/api.service';
import {PlatformService} from '@osd-services/universal/platform.service';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        PlatformService,
    ]
  })
  export class ServicesModule {}
