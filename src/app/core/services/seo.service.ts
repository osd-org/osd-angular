import { Injectable } from '@angular/core';
import { Meta, Title} from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
  ) {
  }

  generateTags(tags: any) {
    this.title.setTitle(tags.meta_title);
    this.meta.addTags([
      {
        name: 'description', content: tags.meta_description ? tags.meta_description : ''
      }
    ]);
  }

  updateTags(tags: any) {
    this.title.setTitle(tags.meta_title ? tags.meta_title : 'OSD');
    this.meta.updateTag({name: 'description', content: tags.meta_description ? tags.meta_description : ''});
  }
}
