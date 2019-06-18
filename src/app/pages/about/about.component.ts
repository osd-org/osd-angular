import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(
    private _header: HeaderService
  ) { }

  ngOnInit() {
    this._header.setTitle('Про нас');
  }

  ngOnDestroy() {
    this._header.setTitle('');
  }

}
