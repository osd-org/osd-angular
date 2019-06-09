import { PlatformService } from './../../core/services/universal/platform.service';
import { HeaderService } from './../../core/shared/layouts/layout-components/header/header.service';
import { BackgroundService, BackgroundColor } from './../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { ApiService } from '@osd-services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  private _testimonialsList;
  private _track: HTMLElement;

  private _testimonialWidth: number;

  public activeSlide = 0;
  public pageContent: PageType;
  public pagination: any[];
  public clientImgList: any[];

  constructor(
    private _background: BackgroundService,
    private _header: HeaderService,
    private _platform: PlatformService,
    private _page: PageService,
    private _seo: SeoService,
    private _api: ApiService,
    private _translate: TranslationService
  ) { }

  ngOnInit() {
    this._header.setTitle('Клиенты');
    this._background.changeColor(BackgroundColor.BLACK);
    this._page.loadPageBySlug('clients').subscribe((e: PageType) => {
      this._seo.updateTags(e.acf);
      this.pageContent = e;
      this.pagination = Array(this.pageContent.acf.reviews.length);
      this.initTestimonialsSlider();
    })
    this._loadClientList();
  }

  initTestimonialsSlider() {
    if (this._platform.isBrowser) {
      setTimeout(() => {
        this._testimonialsList = document.querySelectorAll('.js-testimonial');
        this._testimonialWidth = this._testimonialsList[0].scrollWidth;
        this._track = document.querySelector('.js-track');
      }, 1000);
    }
  }

  goTo(testimonialPosition: number) {
    this._track.style.transform = `translateX(-${testimonialPosition * this._testimonialWidth}px)`;
    this.activeSlide = testimonialPosition;
  }

  next() {
    if (this.activeSlide + 1 < this._testimonialsList.length) {
      this.goTo(this.activeSlide + 1);
    }
  }

  prev() {
    if (this.activeSlide - 1 >= 0) {
      this.goTo(this.activeSlide - 1);
    }
  }

  private _loadClientList() {
    this._api.get('/client/list', {per_page: 14}).subscribe(e => {
      this.clientImgList = e.body;
    })

  }

  ngOnDestroy() {
    this._header.setTitle('');
    this._background.changeColor(BackgroundColor.PURPLE);
  }

}
