import { BackgroundService, BackgroundColor } from './../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { untilDestroyed } from '@osd-rxjs/operators';

@Component({
  selector: 'app-services-marketing-integration',
  templateUrl: './services-marketing-integration.component.html',
  styleUrls: ['./services-marketing-integration.component.scss']
})
export class ServicesMarketingIntegrationComponent implements OnInit, OnDestroy {

  public orderBtnColor = BackgroundColor.PINK;
  public pageContent: PageType;

  constructor(
    private _background: BackgroundService,
    private _page: PageService,
    private _seo: SeoService,
    private _translate: TranslationService
  ) { }

  ngOnInit() {
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.pageContent = null;
      this._page.loadPageBySlug('marketing-integration').subscribe((e: PageType) => {
        this._seo.updateTags(e.acf);
        this.pageContent = e;
      })
    })
    this._background.changeColor(BackgroundColor.PINK);
  }

  public get LANG() : string {
    return this._translate.lang;
  }

  ngOnDestroy(): void {
    this._background.changeColor(BackgroundColor.PURPLE);
  }

}
