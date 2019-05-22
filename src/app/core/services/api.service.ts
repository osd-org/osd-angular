import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslationService } from '../shared/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _headers: HttpHeaders = new HttpHeaders({
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
  });

  private _options: any = {
    headers: this._headers,
    withCredentials: true
  };

  private _apiUrl: string = '';

  constructor(
    private _http: HttpClient,
    private _translate: TranslationService
  ) {
    this._headers = new HttpHeaders();
  }

  /**
   * @param  {string} url
   * @param  {any=null} params
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public get(url: string, params: any = null): Observable<any> {

    const options = Object.assign({}, this._options);
    options.params = params;
    return this.request('GET', url, options);
  }

  /**
   * @param  {string} url
   * @param  {any=null} data
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public post(url: string, data: any = null): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('POST', url, options);
  }

  /**
   *
   * @param url
   * @param data
   * @param cms
   * @returns Observable
   */
  public put(url: string, data: any = null): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('PUT', url, options);
  }

  /**
   * @param  {string} url
   * @param  {any=null} data
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public patch(url: string, data: any = null): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('PATCH', url, options);
  }

  /**
   * @param  {string} url
   * @param  {any=null} data
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public delete(url: string, data: any = null): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('DELETE', url, options);
  }

  /**
   * @param  {string} method
   * @param  {string} url
   * @param  {any=null} options
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public request(method: string, url: string, options: any = this._options): Observable<any> {
    const path = environment.api_host + '/' + this._translate.lang + environment.api_url;
    const subject = new Subject();

    this._http.request(method, path + encodeURI(url), options).subscribe(response => {
      subject.next(response);
    }, error => {
      this._handleError(error);
      subject.error(error);
    }, () => {
      subject.complete();
    });

    return subject;
  }

  /**
   * @param  {HttpErrorResponse|any} error
   */
  private _handleError(error: HttpErrorResponse | any) {
    console.log(error);
  }
}
