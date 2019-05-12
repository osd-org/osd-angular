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
    this.title.setTitle(tags.MetaTitle);
    this.meta.addTags([
      {
        name: 'description', content: tags.MetaDesc ? tags.MetaDesc : ''
      }
    ]);
  }

  updateTags(tags: any) {
    this.title.setTitle(tags.MetaTitle ? tags.MetaTitle : 'Turbico');
    this.meta.updateTag({name: 'description', content: tags.MetaDesc ? tags.MetaDesc : ''});
  }
}
