import { BackgroundService, BackgroundColor } from './../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { untilDestroyed } from '@osd-rxjs/operators';
import {RushSliderConfig} from '../../../core/shared/components/rush-slider/rush-slider-config';
import {RushSliderService} from '../../../core/shared/components/rush-slider/rush-slider.service';

@Component({
  selector: 'app-services-marketing-integration',
  templateUrl: './services-marketing-integration.component.html',
  styleUrls: ['./services-marketing-integration.component.scss']
})
export class ServicesMarketingIntegrationComponent implements OnInit, OnDestroy {

  public sliderConfig: Map<number, RushSliderConfig> = new Map<number, RushSliderConfig>([
    [9999, {
      ignoreSwipe: true
    }
    ]
  ]);
  public orderBtnColor = BackgroundColor.PINK;
  public pageContent: PageType;
  public currentTab: string;
  public slider: RushSliderService;
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
      this._page.loadPageBySlug('marketing-integration').subscribe((e: PageType) => {
        this._seo.updateTags(e.acf);
        this.pageContent = e;
        this.monetizationBlocks = e.acf.monetization_list.monetization_block;
        this.openTab(this.monetizationBlocks[0].name);
      })
    })
    this._background.changeColor(BackgroundColor.PINK);
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
    this._currentTabContent = monetizationBlock.desk; // todo: insert content instead name
  }

  ngOnDestroy(): void {
    this._background.changeColor(BackgroundColor.PURPLE);
  }

  sliderInit(slider: RushSliderService) {
    this.slider = slider;
  }
}
