import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-case-tpl-seventh',
  templateUrl: './case-tpl-seventh.component.html',
  styleUrls: ['./case-tpl-seventh.component.scss']
})
export class CaseTplSeventhComponent implements OnInit, OnDestroy {

  public sliderLoad = false;
  public countsList: any[];
  public partyList: any[];
  private _data: any

  @Input('data')
  set _setData(v : any) {
    console.log(v);

    this._data = v;
    this.countsList = this.data.acf[this.data.slug]['counts'];
    this.partyList = this.data.acf[this.data.slug]['party'];
  }

  public get data(): any {
    return this._data;
  }

  constructor(
    private _background: BackgroundService
  ) {

  }

  ngOnInit() {
    this._background.changeColor(BackgroundColor.ORANGE);
  }


  ngOnDestroy() {
    this._background.changeColor(BackgroundColor.BLACK);
  }
}
