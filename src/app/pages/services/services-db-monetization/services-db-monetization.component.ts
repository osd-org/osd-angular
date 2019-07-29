import { BackgroundService, BackgroundColor } from '../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { untilDestroyed } from '@osd-rxjs/operators';
import {RushSliderConfig} from '../../../core/shared/components/rush-slider/rush-slider-config';

@Component({
  selector: 'app-services-db-monetization',
  templateUrl: './services-db-monetization.component.html',
  styleUrls: ['./services-db-monetization.component.scss']
})
export class ServicesDbMonetizationComponent implements OnInit, OnDestroy {

  public sliderConfig: Map<number, RushSliderConfig> = new Map<number, RushSliderConfig>([[9999, {}]]);

  public orderBtnColor = BackgroundColor.BLUE;
  public pageContent: PageType;
  public currentTab: string;

  public monetizationBlocks: Array<any>;

  private _currentTabContent: string = '';

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
      this._page.loadPageBySlug('db-monetization').subscribe((e: PageType) => {
        this._seo.updateTags(e.acf);
        this.pageContent = e;
        this.monetizationBlocks = e.acf.monetization_list.monetization_block;
        this.openTab(this.monetizationBlocks[0].name);
      })
    });
    this._background.changeColor(BackgroundColor.BLUE);
  }


  public get LANG() : string {
    return this._translate.lang;
  }

  public get currentTabContent(): string {
    return this._currentTabContent;
  }

  openTab(name: string) {
    const monetizationBlock = this.monetizationBlocks.find(block => block.name === name);
    this.currentTab = name;
    this._currentTabContent = monetizationBlock.name; // todo: insert content instead name
  }

  ngOnDestroy(): void {
    this._background.changeColor(BackgroundColor.PURPLE);
  }

}
