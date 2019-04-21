import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _headers: HttpHeaders = new HttpHeaders({
    'Accept': 'application/vnd.softswiss.v1+json',
    'Content-Type': 'application/json'
  });

  private _options: any = {
    headers: this._headers,
    withCredentials: true
  };

  private _apiUrl: string = 'https://api.osdirect.com.ua/ua/wp-json/wp/v2';
  private _apiCmsUrl: string = '/';

  constructor(
    private _http: HttpClient,
  ) {
    this._headers = new HttpHeaders();
  }

  /**
   * @param  {string} url
   * @param  {any=null} params
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public get(url: string, params: any = null, cms: boolean = false): Observable<any> {
    const options = Object.assign({}, this._options);
    options.params = params;
    return this.request('GET', url, options, cms);
  }

  /**
   * @param  {string} url
   * @param  {any=null} data
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public post(url: string, data: any = null, cms: boolean = false): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('POST', url, options, cms);
  }

  /**
   *
   * @param url
   * @param data
   * @param cms
   * @returns Observable
   */
  public put(url: string, data: any = null, cms: boolean = false): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('PUT', url, options, cms);
  }

  /**
   * @param  {string} url
   * @param  {any=null} data
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public patch(url: string, data: any = null, cms: boolean = false): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('PATCH', url, options, cms);
  }

  /**
   * @param  {string} url
   * @param  {any=null} data
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public delete(url: string, data: any = null, cms: boolean = false): Observable<any> {
    const options = Object.assign({}, this._options);
    options.body = data;
    return this.request('DELETE', url, options, cms);
  }

  /**
   * @param  {string} method
   * @param  {string} url
   * @param  {any=null} options
   * @param  {boolean=false} cms
   * @returns Observable
   */
  public request(method: string, url: string, options: any = this._options, cms: boolean = false): Observable<any> {
    const path = cms ? this._apiCmsUrl : this._apiUrl;
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
