import { SeoService } from './../../core/services/seo.service';
import { PageService } from '@osd-services/page.service';
import { BackgroundColor, BackgroundService } from './../../core/shared/layouts/layout-components/background/background.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';
import { ApiService } from '@osd-services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


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

  public backgroundColor = BackgroundColor;

  constructor(
    private _api: ApiService,
    private _platform: PlatformService,
    private _background: BackgroundService,
    private _page: PageService,
    private _seo: SeoService
  ){
    if (_platform.isBrowser) {
      this.mobile = window.innerWidth <= 1080;
    }
  }

   ngOnInit(){
     this._getSliderList();
     this._getWordList();
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
}
