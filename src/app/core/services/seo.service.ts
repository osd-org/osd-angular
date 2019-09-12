import { Injectable } from '@angular/core';
import { Meta, Title} from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private _meta: Meta,
    private _title: Title,
    private _location: Location
  ) {
  }

  generateTags(tags: any) {
    this._title.setTitle(tags.meta_title);
    this._meta.addTags([
      {
        name: 'description', content: tags.meta_description ? tags.meta_description : ''
      }
    ]);
  }

  updateTags(tags: any) {
    this._title.setTitle(tags.meta_title ? tags.meta_title : 'OSDirect');
    this._meta.updateTag({name: 'description', content: tags.meta_description ? tags.meta_description : ''});
    this._meta.updateTag({property: 'og:title', content: tags.meta_title ? tags.meta_title : 'OSDirect'});
    this._meta.updateTag({property: 'og:description', content: tags.meta_description ? tags.meta_description : ''});
    this._meta.updateTag({property: 'og:url', content: 'https://osdirect.com.ua' + this._location.path()});
    this._meta.updateTag({property: 'og:image', content: '/assets/img/osd_logo.png'});
  }
}
