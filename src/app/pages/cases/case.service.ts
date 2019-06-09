import { Injectable } from '@angular/core';
import { ApiService } from '@osd-services/api.service';
import { map, catchError, first } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { SeoService } from '@osd-services/seo.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private _caseList: any[] = [];

  constructor(
    private _api: ApiService,
    private _seo: SeoService
  ) { }

  public getCaseList(param = null) {
    return this._api.get('/case/list', param).pipe(
      map(res => {
        this._caseList = res.body;
        return res;
      }),
      catchError(() =>  of({}))
    )
  }

  public getCasePostBySlug(slug: string) {
    return this._api.get('/posts', {slug: slug}).pipe(
      map(res => res.body),
      catchError(() =>  of({}))
    )
  }

  public checkLoadedPosts(slug: string){
    if (this._caseList.length) {
      return this._caseList.filter(e => {
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

  public get caseList(): any[] {
    return this._caseList;
  }

  public resolveCurrentCasePost(post: any) {
    this._seo.updateTags(post.acf)
  }

}
