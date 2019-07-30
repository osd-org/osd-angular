import { PageService } from '@osd-services/page.service';
import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { SidebarService } from './sidebar.service';
import { map } from 'rxjs/operators';
import { ApiService } from '@osd-services/api.service';
import { DeviceDetectorService } from 'ngx-device-detector';


export interface Menu {
	name: string;
	url: string;
	classes: string[];
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuList: any[] = []

  constructor(
    public sidebar: SidebarService,
    private _translate: TranslationService,
    private _page: PageService,
    private _api: ApiService,
    private _device: DeviceDetectorService
  ) {
  }

  ngOnInit() {
    this._page.contentUpdate$.subscribe(() => {
      this._loadMenu();
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

  private _loadMenu() {
    this._api.getWithCache('/menu/list').pipe(
      map(res => res.body),
      map((menu: any[]) => {
        menu = menu.map((e: Menu) => {
          e.url = e.url.replace(/http:\/\//gi, '');
          return e;
        });
        return menu;
      })
    ).subscribe((e: any[]) => {
      this.menuList = e;
    })
  }

  public get linkHeightDesk() : string {
    return 100 / this.menuList.length + '%';
  }

  public get linkHeightMob() : string {
    return 'calc(' + 100 / this.menuList.length + '% - ' + 84 / this.menuList.length + 'px)';
  }

}
