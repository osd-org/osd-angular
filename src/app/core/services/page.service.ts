import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';


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
}

export interface Title {
	rendered: string;
}



@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private _api: ApiService,
  ) {
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
}





