import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'app/core/shared/translation/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _translate: TranslationService
  ) { }

  ngOnInit() {
  }


  public get LANG(): string {
    return this._translate.lang;
  }


  public get langList(): any[] {
    return this._translate.langList;
  }

  /**
   * change current lang
   */
  public changeLanguage(lang: string) {
    this._translate.changeLang(lang);
  }
}
