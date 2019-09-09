import { Injectable } from '@angular/core';
import { ApiService } from '@osd-services/api.service';
import { map, catchError, first } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { SeoService } from '@osd-services/seo.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { Router } from '@angular/router';
import { untilDestroyed } from '@osd-rxjs/operators';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _blogList: any[] = [];

  constructor(
    private _api: ApiService,
    private _seo: SeoService,
    private _translate: TranslationService,
    private _router: Router,
    private _header: HeaderService
  ) {

  }

  public getBlogList(param = null) {
    return this._api.getWithCache('/posts', param).pipe(
      map(res => {
        this.blogList = res.body;
        return res;
      }),
      catchError(() =>  of({}))
    )
  }

  public getBlogPostBySlug(slug: string) {
    return this._api.getWithCache('/posts', {slug: slug}).pipe(
      map(res => res.body),
      catchError(() =>  of({}))
    )
  }

  public checkLoadedPosts(slug: string){
    if (this._blogList.length) {
      return this._blogList.filter(e => {
        if (e.slug === slug) {
          return e
        } else {
          return [];
        }
      });
    } else {
      return null;
    }
  }

  public get blogList(): any[] {
    return this._blogList;
  }

  public set blogList(v: any[]) {
    this._blogList = v;
  }

  public get LANG(): string {
    return this._translate.lang;
  }

  public resolveCurrentBlogPost(post: any) {
    this._seo.updateTags(post.acf)
  }

  public blogNotSupportLangRedirect(componentThis) {
    if (this.LANG === 'en' || this.LANG === 'ua') {
      this._header.setTitle('');
      this._router.navigateByUrl('/' + this.LANG);
    } else {
      this._translate.onLangChange$.pipe(
        untilDestroyed(componentThis)
      ).subscribe(() => {
        if (this.LANG === 'en' || this.LANG === 'ua') {
          this._header.setTitle('');
          this._router.navigateByUrl('/' + this.LANG);
        }
      });
    }
  }
}
