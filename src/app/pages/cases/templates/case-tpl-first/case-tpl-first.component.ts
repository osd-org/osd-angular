import { Component, OnInit, Input } from '@angular/core';
import {RushSliderService} from '../../../../core/shared/components/rush-slider/rush-slider.service';
import { hexToRgba } from 'app/core/helpers/colorHexToRgba';

@Component({
  selector: 'app-case-tpl-first',
  templateUrl: './case-tpl-first.component.html',
  styleUrls: ['./case-tpl-first.component.scss']
})
export class CaseTplFirstComponent implements OnInit {

  private _data: any;

  @Input('slider') slider: RushSliderService;

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    this._checkDirection();
    this._returnBlockStyle();
  }

  public get data(): any {
    return this._data;
  }

  constructor() { }

  ngOnInit() {
  }

  private _checkDirection() {
    if (this.data.block_direction) {
      if (this.data.block_direction === 'слева') {
        this.data.block_direction_left = true;
      } else {
        this.data.block_direction_left = false;
      }
    } else {
      this.data.block_direction_left = true;
    }
  }

  private _returnBlockStyle() {
    this.data.background_color_opacity = {'background-color': hexToRgba(this.data.background_color, this.data.background_opacity / 100)};
  }

}
