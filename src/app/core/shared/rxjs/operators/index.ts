import { Observable, Subject, of, throwError, interval, OperatorFunction } from 'rxjs';
import { takeUntil, retryWhen, delay, mergeMap, flatMap, timeout, retry, tap } from 'rxjs/operators';

const isFunction = fn => typeof fn === 'function';




export const untilDestroyed = (
  componentInstance,
  destroyMethodName = 'ngOnDestroy'
) => <T>(source: Observable<T>) => {
  const originalDestroy = componentInstance[destroyMethodName];
  if (isFunction(originalDestroy) === false) {
    throw new Error(
      `${
        componentInstance.constructor.name
      } is using untilDestroyed but doesn't implement ${destroyMethodName}`
    );
  }
  if (!componentInstance['__takeUntilDestroy']) {
    componentInstance['__takeUntilDestroy'] = new Subject();

    componentInstance[destroyMethodName] = function() {
      isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
      componentInstance['__takeUntilDestroy'].next(true);
      componentInstance['__takeUntilDestroy'].complete();
    };
  }
  return source.pipe(takeUntil<T>(componentInstance['__takeUntilDestroy']));
};


export function http_retry(method = 'GET', maxRetry: number = 5, delayMs: number = 1000, timeOut: number = 1500) {
  if (method === 'GET') {
    return (src: Observable<any>) => src.pipe(
      timeout(timeOut),
      retryWhen(_ => {
        return interval(delayMs).pipe(
          flatMap(count => count == maxRetry ? throwError("Giving up") : of(count))
        )
      })
    )
  } else {
    return (src: Observable<any>) => src;
  }
}

