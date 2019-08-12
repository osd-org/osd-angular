import {Component, Input, OnInit} from '@angular/core';
import {hexToRgba} from '../../../../core/helpers/colorHexToRgba';

@Component({
  selector: 'app-case-tpl-images',
  templateUrl: './case-tpl-images.component.html',
  styleUrls: ['./case-tpl-images.component.scss']
})
export class CaseTplImagesComponent implements OnInit {

  private _data: any;

  @Input('data')
  set _setData(v : any) {
    this._data = v;

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
