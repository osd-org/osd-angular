import { Injectable } from '@angular/core';
import { CacheInterface } from '@osd-services/cache/interfaces/cache-interface';
import { Observable, of } from 'rxjs';
import { CachedContent } from '@osd-services/cache/interfaces/cached-content';

@Injectable({
  providedIn: 'root'
})
export class CacheService implements CacheInterface {

  /**
   * Default expiration time for cached items
   */
  readonly DEF_EXPIRATION_TIME = 3600000;

  /**
   * Cache Map
   */
  private _cache: Map<string, CachedContent> = new Map<string, CachedContent>();

  constructor() { }

  /**
   * Delete value from cache
   *
   * @param key
   */
  delete(key): void {
    if (this.has(key)) {
      this._cache.delete(key);
    }
  }

  /**
   * Get value from cache
   *
   * @param key
   */
  get(key): Observable<any> {
    if (this.has(key)) {
      return of(this._cache.get(key).content);
    } else {
      throw new Error('Provided key dos not exists in cache');
    }
  }

  /**
   * Is cache exists value by provided key
   *
   * @param key
   */
  has(key): boolean {
    return this._cache.has(key) && this._cache.get(key).expires > Date.now();
  }

  /**
   * Add content in cache
   *
   * @param key
   * @param content
   * @param age
   */
  set(key, content, age?): void {
    this._cache.set(key, {
      expires: Date.now() + (age || this.DEF_EXPIRATION_TIME),
      content: content
    });
  }
}
