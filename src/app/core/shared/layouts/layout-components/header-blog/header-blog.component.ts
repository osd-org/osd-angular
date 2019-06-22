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

  @ViewChild('searchInput') searchInput;
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
