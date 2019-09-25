import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../../blog.service';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { untilDestroyed } from '@osd-rxjs/operators'
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public blogList: any[] = [];
  public mobBlogList: any[] = [];
  public mobSearchBlogList: any[] = [];
  public isSearch = false;
  public loadmore = true;

  public pagination: any = {
    prevPage: null,
    nextPage: null,
    totalPages: null,
    from: null,
    to: null,
    total: null,
    paginationPages: []
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
    private _seo: SeoService
  ) { }

  ngOnInit() {
    this._header.setTitle('Блоги');
    this._background.changeColor(BackgroundColor.BLACK);
    // this._blog.blogNotSupportLangRedirect(this);
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this._page.loadPageBySlug('blog').subscribe((e: PageType) => {
        this._seo.updateTags(e.acf);
      })
      this.mobBlogList = [];
      this.mobSearchBlogList = [];
      this._postsData.page = 1;
      this._getPost();
    });
    this._searchHendler();
  }

  private _getPost() {
    this.loadmore = false;
    this._blog.getBlogList(this._postsData).subscribe( (res: any) => {
      this.blogList = res.body;
      this._createMoblist(res.body);
      this._configPagination(res.headerParams);
      this.loadmore = true;
    });
  }

  public loadPaginationPage(pageNumber: number) {
    this._postsData.page = pageNumber;
    this._getPost();
  }

  private _searchHendler() {
    this._header.searchInputEvent$.pipe(
      untilDestroyed(this)
    ).subscribe(e => {
      if (e) {
        this._resetSearch();
        this.isSearch = true;
        this._postsData['search'] = e;
        this._getPost();
      } else {
        this._resetSearch();
        this._getPost();
      }
    })
  }

  public loadMore() {
    this._postsData.page++;
    this._getPost();
  }

  private _resetSearch() {
    this.isSearch = false;
    delete this._postsData['search'];
    this._postsData.per_page = 9;
    this._postsData.page = 1;
    this.mobSearchBlogList = [];
  }

  private _configPagination(headers) {
    this.pagination.total = +headers['total'];
    this.pagination.totalPages = +headers['pages'];
    this.pagination.from = this.pagination.total ? ((this._postsData.page - 1) * this._postsData.per_page) + 1 : ' ';
    this.pagination.to = (this._postsData.page * this._postsData.per_page) > this.pagination.total ? this.pagination.total : this._postsData.page * this._postsData.per_page;
    this.pagination.prevPage = this._postsData.page > 1 ? this._postsData.page : '';
    this.pagination.nextPage = this._postsData.page < this.pagination.totalPages ? this._postsData.page + 1 : '';
    this.pagination.paginationPages = Array(this.pagination.totalPages);
  }

  private _createMoblist(res) {
    res.forEach(e => {
      if (!this.isSearch) {
        this.mobBlogList.push(e);
      } else {
        this.mobSearchBlogList.push(e);
      }
    });
  }

  public get mobList(): any[] {
    if (!this.isSearch) {
      return  this.mobBlogList;
    } else {
      return this.mobSearchBlogList;
    }
  }

  ngOnDestroy() {

  }
}
