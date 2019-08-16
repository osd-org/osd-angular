import { CaseService } from './../../case.service';
import { ApiService } from './../../../../core/services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { hexToRgba } from 'app/core/helpers/colorHexToRgba';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { CountUpOptions } from '@osd-directives/countUp/countUp';

@Component({
  selector: 'app-case-tpl-results',
  templateUrl: './case-tpl-results.component.html',
  styleUrls: ['./case-tpl-results.component.scss']
})
export class CaseTplResultsComponent implements OnInit {
  public countOpts: CountUpOptions = {
    duration: 2,
    decimalPlaces: 0,
    smartEasingThreshold: 9999
  };
  private _data: any;

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    this._returnBlockStyle();
    this._returnCircleFillAndText();
  }

  constructor(
    private _translate: TranslationService,
    private _api: ApiService,
    private _case: CaseService
  ) { }

  ngOnInit() {
    this._getPrevNextCase();
  }

  public get data(): any {
    return this._data;
  }

  private _returnBlockStyle() {
    this.data.background_color_opacity = {'background-color': hexToRgba(this.data.background_color, this.data.background_opacity / 100)};
  }

  private _returnCircleFillAndText() {
    if (this.data.counts) {
      this.data.counts.forEach((e: any, i) => {
        e.background_color_opacity = hexToRgba(e.color, e.opacity / 100);
        e.multiLine = e.text.split('<br />');
        let y = 55;
        let step = 5;
        e.y = [];
        e.multiLine.forEach((l) => {
          y = y + 3 + step;
          e.y.push(y);
        });
      });
    }
  }

  public get LANG(): string {
    return this._translate.lang;
  }


  private _getPrevNextCase() {
    if (this._case.currentCaseId) {
      this._api.getWithCache('/case/item/' + this._case.currentCaseId).subscribe(e => {
        this._data['next'] = e['body']['next'];
        this._data['prev'] = e['body']['prev'];
      });
    } else {
      this._data['next'] = null;
      this._data['prev'] = null;
    }
  }
}
