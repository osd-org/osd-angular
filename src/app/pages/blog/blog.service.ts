import { Injectable } from '@angular/core';
import { ApiService } from '@osd-services/api.service';
import { map, catchError, first } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { SeoService } from '@osd-services/seo.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _blogList: any[] = [];

  constructor(
    private _api: ApiService,
    private _seo: SeoService
  ) { }

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

  public resolveCurrentBlogPost(post: any) {
    this._seo.updateTags(post.acf)
  }

}
