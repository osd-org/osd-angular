import { HeaderService } from '../header/header.service';
import { map, debounceTime } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { ApiService } from '@osd-services/api.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header-blog',
  templateUrl: './header-blog.component.html',
  styleUrls: ['./header-blog.component.scss']
})
export class HeaderBlogComponent implements OnInit {

  public logoImg = '/assets/img/content/osd_logo_no-animation.png';
  @ViewChild('searchInput') searchInput;
  @ViewChild('searchInputMob') searchInputMob;
  constructor(
    private _translate: TranslationService,
    public sidebar: SidebarService,
    private _api: ApiService,
    public header: HeaderService
  ) { }

  ngOnInit() {
    this._loadLanguages();
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(500)
    ).subscribe((e: any) => this.header.searchInputEvent$.next(e.target.value));
    fromEvent(this.searchInputMob.nativeElement, 'input').pipe(
      debounceTime(500)
    ).subscribe((e: any) => this.header.searchInputEvent$.next(e.target.value));
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

  public changeLanguageNext(lang: string) {
    const next = this.langList.indexOf(lang) + 1;
    this._translate.changeLang(next === this.langList.length ? this.langList[0] : this.langList[next]);
  }

  public langAnimation() {
    let position;
    switch (this.LANG) {
      case 'ru':
        position = 0 + '%';
        break;

      case 'ua':
        position = 'calc(100% - 39px)';
        break;

      case 'en':
        position = 'calc(50% - 19px)';
        break;

      default:
        break;
    }
    return position;
  }

}
