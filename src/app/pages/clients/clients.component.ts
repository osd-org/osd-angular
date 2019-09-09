import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';
import { HeaderService } from '../../core/shared/layouts/layout-components/header/header.service';
import { BackgroundService, BackgroundColor } from '../../core/shared/layouts/layout-components/background/background.service';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { ApiService } from '@osd-services/api.service';
import { untilDestroyed } from '@osd-rxjs/operators';
import {RushSliderService} from '../../core/shared/components/rush-slider/rush-slider.service';
import {RushSliderConfig} from '../../core/shared/components/rush-slider/rush-slider-config';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  public sliderConfig: Map<number, RushSliderConfig> = new Map<number, RushSliderConfig>([[9999, {}]]);
  public pageContent: PageType;
  public pagination: any[];
  public clientImgList: any[];

  public slider: RushSliderService;


  public animation = false;
  private _animateData = [
    800, 100, 200,
    600, 300, 900,
    700, 400, 500,
    1100, 1500, 1000
  ];

  constructor(
    private _background: BackgroundService,
    private _header: HeaderService,
    private _page: PageService,
    private _seo: SeoService,
    private _api: ApiService,
  ) { }

  ngOnInit() {
    this._header.setTitle('Клиенты');
    this._background.changeColor(BackgroundColor.BLACK);
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.pageContent = null;
      this._page.loadPageBySlug('clients').subscribe((e: PageType) => {
        this._seo.updateTags(e.acf);
        this.pageContent = e;
        this.pagination = Array(this.pageContent.acf.reviews.length);
      })
    });
    this._loadClientList();
  }

  sliderInit(slider: RushSliderService) {
    this.slider = slider;
  }

  private _loadClientList() {
    this.animation = false;
    this._api.get('/client/list', {per_page: 20}).subscribe(e => {
      this.clientImgList = e.body;
      this._animate();
    })
  }

  private _animate() {
    setTimeout(() => {
      this.animation = true;
    }, 500);
  }

  public getDelay(i: number) {
    return this._animateData[i] + 'ms'
  }

  ngOnDestroy() {
    this._header.setTitle('');
    this._background.changeColor(BackgroundColor.PURPLE);
  }

  public get isIE(): boolean {
    return this._header.isIE;
  }

}
