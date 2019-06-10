import { mapStyle } from './mapStyle';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  public mapStyle = mapStyle;

  constructor(
    private _header: HeaderService
  ) { }

  ngOnInit() {
    this._header.setTitle('Контакты');
  }

  ngOnDestroy(): void {
    this._header.setTitle('');
  }

}
