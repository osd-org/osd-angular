import { Injectable } from '@angular/core';
import { ApiService } from '@osd-services/api.service';
import { map, catchError, first } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  constructor(
    private _api: ApiService
  ) { }

  public getBlogList(param = null) {
    return this._api.get('/posts', param).pipe(
      first(),
      catchError(() =>  of([]))
    )
  }

}
