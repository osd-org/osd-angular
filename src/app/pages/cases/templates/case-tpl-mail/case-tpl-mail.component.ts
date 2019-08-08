import { Component, OnInit, Input } from '@angular/core';
import { hexToRgba } from 'app/core/helpers/colorHexToRgba';

@Component({
  selector: 'app-case-tpl-mail',
  templateUrl: './case-tpl-mail.component.html',
  styleUrls: ['./case-tpl-mail.component.scss']
})
export class CaseTplMailComponent implements OnInit {

  private _data: any;

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    console.log(v);

    this._returnBlockStyle();
  }

  constructor() { }

  ngOnInit() {
  }

  public get data(): any {
    return this._data;
  }

  private _returnBlockStyle() {
    this.data.background_color_opacity = {'background-color': hexToRgba(this.data.background_color, this.data.background_opacity / 100)};
  }

}
