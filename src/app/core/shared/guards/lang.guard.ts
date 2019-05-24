import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { TranslationService } from '../translation/translation.service';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LangGuard implements CanActivate, CanActivateChild {

  constructor(
    private _translate: TranslationService,
    private _router: Router
  ) {

  }

  private _makeUrl(parts, params) {
    let url = params.join('/');

    if (parts[1]) {
      url += '?' + parts[1];
    }

    return url;
  }

  /**
   * Set lang segment in url
   *
   * @param next
   * @param state
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._translate.langResolved$.pipe(
      map(navigate => {
        const parts = state.url.split('?');
        const params = parts[0].split('/');

        // not show default lang on main page
        if (params.length === 2 && params[1] === this._translate.defaultLang) {
          params.splice(1, 1);
          this._navigate(parts, params);

          return false;
        } else if (params.length === 2 && params[1] !== this._translate.defaultLang) {
          /**
           * If main page and lang segment = default lang
           */
          if (params[1] === '' && this._translate.lang === this._translate.defaultLang) {
            return true;
          }
        }

        // replace lang segment
        if (params[1] !== this._translate.lang) {
          /**
           * GEO redirect
           */
          if (params.length >= 2 && params[1] !== '' && !this._translate.langExists(params[1])) {
            params.splice(1, 0, this._translate.lang);
          } else {
            params[1] = this._translate.lang;
          }

          this._navigate(parts, params);

          return false;
        }

        return true;
      }),
      first()
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }

  private _navigate(parts, params) {
    this._router.navigateByUrl(this._makeUrl(parts, params), {
      replaceUrl: true
    });
  }

}
