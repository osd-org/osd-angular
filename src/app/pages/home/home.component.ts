import { TranslationService } from './../../core/shared/translation/translation.service';
import { SeoService } from './../../core/services/seo.service';
import { PageService } from '@osd-services/page.service';
import { BackgroundColor, BackgroundService } from './../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';
import { ApiService } from '@osd-services/api.service';
import { untilDestroyed } from '@osd-rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { WindowService } from '@osd-services/universal/window.service';


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
  public linksList = [];

  /**
   * True if mobile version
   */
  public mobile: boolean;

  /**
   * Uses for reloading slider after window resizing
   */
  public resize: boolean;

  public backgroundColor = BackgroundColor;

  public pascalcaData: any = null;

  constructor(
    private _api: ApiService,
    private _platform: PlatformService,
    private _background: BackgroundService,
    private _page: PageService,
    private _seo: SeoService,
    private _translate: TranslationService,
    private _cookie: CookieService,
    private _window: WindowService
  ){
    if (this._platform.isBrowser) {
      this.mobile = window.innerWidth <= 1080;
      this._resizeHandler();
    }
  }

   ngOnInit(){
    this._background.changeColor(BackgroundColor.BLACK);
    this._getSliderList();
    this._getWordList();

    this._translate.onLangChange$.pipe(
      untilDestroyed(this)
    ).subscribe(lang => {
      this._getSliderList();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
  }


  private _getSliderList() {
    this.slideList = [];

    this._api.getWithCache('/slider/list').subscribe(e => {
      setTimeout(() => {
        this.slideList = e.body;
      }, 10);
    })
  }

  private _getWordList() {
    this._page.loadPageBySlug('main').subscribe(e => {
      this.pascalcaData = this._resolvePascal(e['acf']['pascalca']);
      this._seo.updateTags(e);
      this.linksList = e['acf']['fly_words'];
    })
  }

  /**
   * Handle window resize for slider re-initialization
   */
  private _resizeHandler() {
    if (this._platform.isBrowser) {
      fromEvent(this._window.nativeWindow, 'resize').pipe(
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

  private _resolvePascal(pascal: any) {
    if (pascal['direction'] === 'слева') {
      pascal['style'] = {
        'right': '-300px',
        'animation-name': 'pascalcaMoveRight',
        'animation-duration': pascal['speed'] + 's'
      };
    } else {
      pascal['style'] = {
        'left': '-300px',
        'animation-name': 'pascalcaMoveLeft',
        'animation-duration': pascal['speed'] + 's'
      };
    }
    if (this._cookie.check('pascal')) {
      pascal['show_pascalca'] = false;
    } else {
      if (pascal['show_pascalca']) {
        this._cookie.set('pascal', '1', 999, '/');
      }
    }
    return pascal;
  }
}
