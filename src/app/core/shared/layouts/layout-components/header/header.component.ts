import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { ApiService } from '@osd-services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _translate: TranslationService,
    public sidebar: SidebarService,
    private _api: ApiService
  ) { }

  ngOnInit() {
    this._loadLanguages();
  }

  private _loadLanguages() {
    this._api.get('/lang/list').pipe(
      map(res => res.body)
    ).subscribe((e: any[]) => {
      this._translate.langList = e;
    })
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
