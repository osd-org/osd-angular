import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { TranslationService } from '../shared/translation/translation.service';
import { BehaviorSubject } from 'rxjs';


export interface PageType {
	id: number;
	slug: string;
	title: Title;
	content: Content;
	acf?: Acf;
}

export interface Content {
	rendered: string;
	protected: boolean;
}

export interface Acf {
	meta_title: string;
  meta_description: string;
  monetization_list?: any;
  reviews?: any[];
  img?: any;
  counts?: any[];
  left_block?: any;
  right_block?: any;
}

export interface Title {
	rendered: string;
}



@Injectable({
  providedIn: 'root'
})
export class PageService {

  /**
   * Emitter that emits when need to update content
   */
  private _contentUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private _api: ApiService,
    private _translate: TranslationService
  ) {
    this._langChangeListener();
  }

  /**
   * Returns emitter that emits when need update content
   */
  get contentUpdate$(): BehaviorSubject<boolean> {
    return this._contentUpdate$;
  }

  /**
   * loadPageBySlug
   */
  public loadPageBySlug(slug: string) {
    return this._api.get('/pages', {slug: slug}).pipe(
      map((e: any) => {
        if (e.body.length > 0) {
          return e.body[0];
        } else {
          return {};
        }
      })
    );
  }


  /**
   * Lang change event listener
   *
   * @private
   */
  private _langChangeListener() {
    this._translate.onLangChange$.pipe(
      distinctUntilChanged(),
      debounceTime(100)
    ).subscribe(lang => {
      this._contentUpdate$.next(true);
    });
  }


}





