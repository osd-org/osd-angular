import { Component, OnInit } from '@angular/core';
import { BackgroundColor, BackgroundService } from 'app/core/shared/layouts/layout-components/background/background.service';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private _header: HeaderService,
    private _background: BackgroundService,
  ) { }

  ngOnInit() {
    this._header.setTitle('404');
    this._background.changeColor(BackgroundColor.BLACK);
  }

  ngOnDestroy() {
    this._header.setTitle('');
  }

}
