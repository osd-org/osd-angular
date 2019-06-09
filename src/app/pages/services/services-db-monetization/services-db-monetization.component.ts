import { BackgroundService, BackgroundColor } from './../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';

@Component({
  selector: 'app-services-db-monetization',
  templateUrl: './services-db-monetization.component.html',
  styleUrls: ['./services-db-monetization.component.scss']
})
export class ServicesDbMonetizationComponent implements OnInit, OnDestroy {

  public orderBtnColor = BackgroundColor.BLUE;
  public pageContent: PageType;

  constructor(
    private _background: BackgroundService,
    private _page: PageService,
    private _seo: SeoService,
    private _translate: TranslationService
  ) { }

  ngOnInit() {
    this._page.loadPageBySlug('db-monetization').subscribe((e: PageType) => {
      this._seo.updateTags(e.acf);
      this.pageContent = e;
    })
    this._background.changeColor(BackgroundColor.BLUE);
  }


  public get LANG() : string {
    return this._translate.lang;
  }


  ngOnDestroy(): void {
    this._background.changeColor(BackgroundColor.PURPLE);
  }

}
