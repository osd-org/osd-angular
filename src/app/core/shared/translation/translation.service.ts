import { EventEmitter, Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { LANG_UA } from './LANG_UA';
import { LANG_EN } from './LANG_EN';
import { LANG_RU } from './LANG_RU';

import { AsyncSubject, BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';
// import { EnvironmentService } from '@osd-services/environment.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { WindowService } from '@osd-services/universal/window.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _defaultLang = 'ru';

  private _currentLang = this._cookie.check('qtrans_front_language') ? this._cookie.get('qtrans_front_language') : this._defaultLang;

  private _langChange$: EventEmitter<string> = new EventEmitter<string>();

  private _langResolved: boolean;

  private _resolveLang$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * Available languages
   */
  private _dictionary: any = {
    'en': LANG_EN,
    'ru': LANG_RU,
    'ua': LANG_UA
  };


  constructor(
    // private _environment: EnvironmentService,
    private _window: WindowService,
    private _cookie: CookieService,
    private _router: Router
  ) {
    // this._resolveCurrentLang();

  }

  get langResolved$(): ReplaySubject<boolean> {
    return this._resolveLang$;
  }

  get langResolved(): boolean {
    return this._langResolved;
  }

  /**
   * Returns default lang
   */
  get defaultLang(): string {
    return this._defaultLang;
  }


  /**
   * Returns current language
   */
  get lang(): string {
    return this._currentLang;
  }

  /**
   * Returns emitter which emits on lang change
   */
  get onLangChange$(): EventEmitter<string> {
    return this._langChange$;
  }

  /**
   * Check if provided language exists
   *
   * @param lang
   */
  public langExists(lang: string): boolean {
    return this._dictionary.hasOwnProperty(lang);
  }

  /**
   * Change current lang
   *
   * @param lang
   */
  public changeLang(lang: string) {
    if (this._dictionary.hasOwnProperty(lang)) {
      this._currentLang = lang;
      this._cookie.set('qtrans_front_language', lang, 999999, '/');
      this._changeUrlParam(lang);
      this._langChange$.next(lang);
    }
  }

  /**
   * Translate text
   *
   * Using: translate('Hello, #name#', {name: 'Alex'});
   * Output: 'Hei Alex'; // (fi lang)
   *
   * @param key
   * @param params
   */
  public translate(key, params = null): string {
    let translated = '';

    if (isNullOrUndefined(this._dictionary[this._currentLang]) || isNullOrUndefined(this._dictionary[this._currentLang][key])) {
      translated = key;
    } else {
      translated = this._dictionary[this._currentLang][key];
    }

    if (params) {
      const keyParams = [];
      const regex = /\#([^^]*?)\#/ig;
      let match;

      while (match = regex.exec(key)) {
        keyParams.push(match[1]);
      }

      keyParams.forEach((item) => {
        translated = translated.replace(`#${item}#`, params[item]);
      });
    }

    return translated;
  }

  /**
   * Chang Lang segment in url
   *
   * @param lang
   * @private
   */
  private _changeUrlParam(lang: string) {
    if (this.langResolved) {
      this._router.navigateByUrl(this._router.url);
    } else {
      const host = this._window.nativeWindow.location.origin;
      const uri = this._window.nativeWindow.location.href.replace(host, '');

      this._router.navigateByUrl(uri);
    }
  }

  /**
   * Resolve current language
   *
   * @private
   */
  // private _resolveCurrentLang() {
  //   this._environment.env$.subscribe(env => {
  //     const host = this._window.nativeWindow.location.origin;
  //     const uri = this._window.nativeWindow.location.href.replace(host, '');

  //     const langSegment = uri.split('/')[1];

  //     if (langSegment && this._dictionary.hasOwnProperty(langSegment)) { // check lang segment
  //       this.changeLang(langSegment);
  //     } else if (this._cookie.check('lang') && this._dictionary.hasOwnProperty(this._cookie.get('lang'))) { // check cookie
  //       this.changeLang(this._cookie.get('lang'));
  //     } else if (env.locale.short && this._dictionary.hasOwnProperty(env.locale.short)) { // check environment
  //       this.changeLang(env.locale.short);
  //     }

  //     this._langResolved = true;
  //     this._resolveLang$.next(true);
  //   });
  // }
}
