import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CaseService } from '../../case.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@osd-rxjs/operators';
import { PageService } from '@osd-services/page.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.scss']
})
export class ItemNewComponent implements OnInit, OnDestroy {

  public casePost: any = null;
  public currentSlideList: any;

  constructor(
    private _case: CaseService,
    private _route: ActivatedRoute,
    private _background: BackgroundService,
    private _page: PageService
  ) {

   }


  ngOnInit() {
    this._background.changeColor(BackgroundColor.BLACK);
    this._page.contentUpdate$.pipe(
      switchMap(() => this._route.params),
      switchMap(params => this._case.getCasePostBySlug(params.slug)),
      untilDestroyed(this)
    ).subscribe((res) => {
      this._case.resolveCurrentCasePost(res[0]);
      this.casePost = res[0];
      this.currentSlideList = this.casePost['acf']['slide'];
    })
  }

  ngOnDestroy() {

  }

}
