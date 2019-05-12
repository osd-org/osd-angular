import { Observable } from 'rxjs';

export interface CacheInterface {

  /**
   * Get item from cache by key
   *
   * @param key
   */
  get(key): Observable<any>;

  /**
   * Add item in cache
   *
   * @param key
   * @param content
   * @param age
   */
  set(key, content, age): void;

  /**
   * If item exists in cache
   *
   * @param key
   */
  has(key): boolean;

  /**
   * Delete item form cache
   *
   * @param key
   */
  delete(key): void;
}
