import { BackgroundService, BackgroundColor } from './../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-services-marketing-integration',
  templateUrl: './services-marketing-integration.component.html',
  styleUrls: ['./services-marketing-integration.component.scss']
})
export class ServicesMarketingIntegrationComponent implements OnInit, OnDestroy {

  public orderBtnColor = BackgroundColor.PINK;

  constructor(
    private _background: BackgroundService
  ) { }

  ngOnInit() {
    this._background.changeColor(BackgroundColor.PINK);
  }

  ngOnDestroy(): void {
    this._background.changeColor(BackgroundColor.PURPLE);
  }

}
