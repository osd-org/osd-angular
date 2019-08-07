import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CaseService } from '../../case.service';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { untilDestroyed } from '@osd-rxjs/operators'
import { PageService } from '@osd-services/page.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public caseList: any[] = [];
  public mobCaseList: any[] = [];
  private _storedMobBlogList: Map<any, any> = new Map<any, any>();
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
    private _case: CaseService,
    private _header: HeaderService,
    private _page: PageService,
    private _background: BackgroundService,
    private _device: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this._header.setTitle('КЕЙСЫ');
    this._background.changeColor(BackgroundColor.BLACK);
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this._getCase();
    });
  }

  private _getCase() {
    this.loadmore = false;
    this._case.getCaseList(this._postsData).subscribe( (res: any) => {
      this.caseList = res.body;
      this._createMoblist(res.body);
      this._configPagination(res.headerParams);
      this.loadmore = true;
    });
  }

  public loadPaginationPage(pageNumber: number) {
    this._postsData.page = pageNumber;
    this._getCase();
  }

  public loadMore() {
    this._postsData.page++;
    this._getCase();
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
      if (!this._storedMobBlogList.has(e['id'])) {
        this.mobCaseList.push(e);
        this._storedMobBlogList.set(e['id'], e['id']);
      }
    });
  }

  ngOnDestroy() {

  }
}
