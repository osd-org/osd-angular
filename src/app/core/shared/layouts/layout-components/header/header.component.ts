import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'app/core/shared/translation/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public langList: string[] = ['ru', 'en', 'ua'];

  constructor(
    private _translate: TranslationService
  ) { }

  ngOnInit() {
  }


  public get LANG(): string {
    return this._translate.lang;
  }

  /**
   * change current lang
   */
  public changeLang(lang: string) {
    this._translate.changeLang(lang);
  }
}
