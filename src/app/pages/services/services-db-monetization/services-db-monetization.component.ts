import { BackgroundService, BackgroundColor } from './../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-services-db-monetization',
  templateUrl: './services-db-monetization.component.html',
  styleUrls: ['./services-db-monetization.component.scss']
})
export class ServicesDbMonetizationComponent implements OnInit, OnDestroy {

  public orderBtnColor = BackgroundColor.BLUE;

  constructor(
    private _background: BackgroundService
  ) { }

  ngOnInit() {
    this._background.changeColor(BackgroundColor.BLUE);
  }

  ngOnDestroy(): void {
    this._background.changeColor(BackgroundColor.PURPLE);
  }

}
