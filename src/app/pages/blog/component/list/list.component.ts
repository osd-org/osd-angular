import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../../blog.service';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { untilDestroyed } from '@osd-rxjs/operators'
import { PageService } from '@osd-services/page.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public blogList: any[] = [];
  public paginationPages: any[] = [];
  private _per_page: number = 9;

  constructor(
    private _blog: BlogService,
    private _header: HeaderService,
    private _page: PageService
  ) { }

  ngOnInit() {
    this._header.setTitle('Блоги');
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this._blog.getBlogList({per_page: this._per_page}).subscribe( (res: any) => {
        this.blogList = res.body;
        this.paginationPages = res.headerParams.pages;
        this.paginationPages = Array(this.paginationPages);
      });
    });
    this._searchHendler();
  }

  public loadPaginationPage(pageNumber: number) {
    this._blog.getBlogList({per_page: this._per_page, page: pageNumber}).subscribe( (res: any) => {
      this.blogList = res.body;
      this.paginationPages = res.headerParams.pages;
      this.paginationPages = Array(this.paginationPages);
    });
  }

  private _searchHendler() {
    this._header.searchInputEvent$.subscribe(e => {
      this._blog.getBlogList({per_page: this._per_page, search: e}).subscribe( (res: any) => {
        this.blogList = res.body;
        this.paginationPages = res.headerParams.pages;
        this.paginationPages = Array(this.paginationPages);
      });
    })
  }

  ngOnDestroy() {

  }
}
