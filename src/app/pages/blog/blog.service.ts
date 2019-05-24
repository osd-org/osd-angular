import { Injectable } from '@angular/core';
import { ApiService } from '@osd-services/api.service';
import { map, catchError, first } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public blogList$: Subject<any[]> = new Subject<any[]>();

  constructor(
    private _api: ApiService
  ) { }

  private _getBlogList() {
    this._api.get('/admin/banner/type/list').pipe(
      first(),
      map(res => res['data']['list']),
      catchError(() =>  of([]))
    ).subscribe();
  }

}
