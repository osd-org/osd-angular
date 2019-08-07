import { Component, OnInit, Input } from '@angular/core';
import {RushSliderService} from '../../../../core/shared/components/rush-slider/rush-slider.service';

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
    this.checkDirection();
    console.log(v);

  }

  public get data(): any {
    return this._data;
  }

  constructor() { }

  ngOnInit() {
  }

  public checkDirection() {
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
}
