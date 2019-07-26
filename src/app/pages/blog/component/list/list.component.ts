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
  public loadmore = true;
  private _perPage: number = 9;
  private _currentPage: number = 1;
  private _maxPage: number = null;

  private _pagination: any = {
    prevPage: null,
    nextPage: null,
    totalPages: null,
    from: null,
    to: null,
    total: null
  }
  private _postsData: any = {
    per_page: 9,
    page: 1
  }

  constructor(
    private _blog: BlogService,
    private _header: HeaderService,
    private _page: PageService,
    private _background: BackgroundService,
  ) { }

  ngOnInit() {
    this._header.setTitle('Блоги');
    this._background.changeColor(BackgroundColor.BLACK);
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this._getPost();
    });
    this._searchHendler();
  }

  private _getPost() {
    this._blog.getBlogList(this._postsData).subscribe( (res: any) => {
      this.blogList = res.body;
      this._configPagination(res.headerParams);
    });
  }

  public loadPaginationPage(pageNumber: number) {
    this._postsData.page = pageNumber;
    this._getPost();
  }

  private _searchHendler() {
    this._header.searchInputEvent$.subscribe(e => {
      if (e) {
        this._blog.getBlogList({per_page: 100, search: e}).subscribe( (res: any) => {
          this.blogList = res.body;
          this._compareData(res);
        });
      } else {
        this._resetSearch(e);
      }
    })
  }

  public loadMore() {
    this._postsData.page++;
    this._getPost();
  }

  private _compareData(res) {
    this._maxPage = res.headerParams.pages;
    this.paginationPages = Array(this._maxPage);
    this._maxPage === this._currentPage ? this.loadmore = false : this.loadmore = true;
  }

  private _resetSearch(enter: any) {
    enter ? this.loadmore = false : this.loadmore = true;
    this._blog.getBlogList({per_page: this._perPage}).subscribe( (res: any) => {
      this.blogList = res.body;
      this._compareData(res);
    });
  }

  private _configPagination(headers) {
    this._pagination.total = +headers['total'];
    this._pagination.totalPages = +headers['pages'];
    this._pagination.from = this._pagination.total ? ((this._postsData.page - 1) * this._postsData.per_page) + 1 : ' ';
    this._pagination.to = (this._postsData.page * this._postsData.per_page) > this._pagination.total ? this._pagination.total : this._postsData.page * this._postsData.per_page;
    this._pagination.prevPage = this._postsData.page > 1 ? this._postsData.page : '';
    this._pagination.nextPage = this._postsData.page < this._pagination.totalPages ? this._postsData.page + 1 : '';
}

  ngOnDestroy() {

  }
}
