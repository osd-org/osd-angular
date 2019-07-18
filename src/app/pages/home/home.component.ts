import { SeoService } from './../../core/services/seo.service';
import { PageService } from '@osd-services/page.service';
import { BackgroundColor, BackgroundService } from './../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';
import { ApiService } from '@osd-services/api.service';
import { untilDestroyed } from '@osd-rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {


  /**
   * Slides list for test
   */
  public slideList = [];

  /**
   * Demo data for links slider
   */
  public linksList = [
    // {
    //   url: '/',
    //   fontSize: 32,
    //   text: 'Дизайн',
    //   bottomOffset: 30,
    //   speed: 16
    // },
  ];

  /**
   * True if mobile version
   */
  public mobile: boolean;

  /**
   * Uses for reloading slider after window resizing
   */
  public resize: boolean;

  public backgroundColor = BackgroundColor;

  constructor(
    private _api: ApiService,
    private _platform: PlatformService,
    private _background: BackgroundService,
    private _page: PageService,
    private _seo: SeoService
  ){
    if (_platform.isBrowser) {
      this.mobile = window.innerWidth <= 1080 || window.navigator.userAgent.indexOf('Trident/') >= 0;
      this._resizeHandler();
    }
  }

   ngOnInit(){
    this._background.changeColor(BackgroundColor.BLACK);
    this._getSliderList();
    this._getWordList();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
  }


  private _getSliderList() {
    this._api.getWithCache('/slider/list').subscribe(e => {
      this.slideList = e.body;
    })
  }

  private _getWordList() {
    this._page.loadPageBySlug('main').subscribe(e => {
      this._seo.updateTags(e);
      this.linksList = e['acf']['fly_words'];
    })
    // this._api.getWithCache('/slider/list').subscribe(e => {
    //   this.slideList = e.body;
    // })
  }

  /**
   * Handle window resize for slider re-initialization
   */
  private _resizeHandler() {
    fromEvent(window, 'resize').pipe(
      untilDestroyed(this),
      debounceTime(500)
    ).subscribe(() => {
      this.resize = true;

      setTimeout(() => {
        this.resize = false;
      }, 10);
    });
  }
}
