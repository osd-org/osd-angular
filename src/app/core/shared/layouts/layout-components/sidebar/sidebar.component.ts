import { PageService } from '@osd-services/page.service';
import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { SidebarService } from './sidebar.service';
import { map } from 'rxjs/operators';
import { ApiService } from '@osd-services/api.service';


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
    public translate: TranslationService,
    private _page: PageService,
    private _api: ApiService
  ) {
  }

  ngOnInit() {
    this._page.contentUpdate$.subscribe(() => {
      this._loadMenu();
    })
  }


  public get LANG(): string {
    return this.translate.lang;
  }

  private _loadMenu() {
    this._api.get('/menu/list').pipe(
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

  public get linkHeight() : string {
    return 100 / this.menuList.length + '%';
  }

}
