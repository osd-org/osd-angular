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
  public paginationPages: any[] = [];
  private _per_page: number = 9;

  constructor(
    private _case: CaseService,
    private _header: HeaderService,
    private _page: PageService,
    private _background: BackgroundService,
    private _device: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this._header.setTitle('КЕЙСЫ');
    if (this._device.isMobile()) {
      this._background.changeColor(BackgroundColor.BLACK);
    } else {
      this._background.changeColor(BackgroundColor.DARKBLUE);
    }
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this._case.getCaseList({per_page: this._per_page}).subscribe( (res: any) => {
        this.caseList = res.body;
        this.paginationPages = res.headerParams.pages;
        this.paginationPages = Array(this.paginationPages);
      });
    });
  }

  public loadPaginationPage(pageNumber: number) {
    this._case.getCaseList({per_page: this._per_page, page: pageNumber}).subscribe( (res: any) => {
      this.caseList = res.body;
      this.paginationPages = res.headerParams.pages;
      this.paginationPages = Array(this.paginationPages);
    });
  }

  ngOnDestroy() {

  }
}
