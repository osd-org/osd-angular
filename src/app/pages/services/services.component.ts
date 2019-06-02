import { HeaderService } from './../../core/shared/layouts/layout-components/header/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

  constructor(
    private _header: HeaderService
  ) { }

  ngOnInit() {
    this._header.setTitle('Сервисы');
  }

  ngOnDestroy(): void {
    this._header.setTitle('');
  }

}
