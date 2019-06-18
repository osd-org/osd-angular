import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


const isFunction = fn => typeof fn === 'function';

const doUnsubscribe = subscription => {
  subscription &&
  isFunction(subscription.unsubscribe) &&
  subscription.unsubscribe();
};

const doUnsubscribeIfArray = subscriptionsArray => {
  Array.isArray(subscriptionsArray) &&
  subscriptionsArray.forEach(doUnsubscribe);
};

export function AutoUnsubscribe({
  blackList = [],
  arrayName = '',
  event = 'ngOnDestroy'
} = {}) {
  return function(constructor: Function) {
    const original = constructor.prototype[event];

    if (!isFunction(original)) {
      throw new Error(
        `${
          constructor.name
        } is using @AutoUnsubscribe but does not implement OnDestroy`
      );
    }

    constructor.prototype[event] = function() {
      if (arrayName) {
        doUnsubscribeIfArray(this[arrayName]);
        isFunction(original) && original.apply(this, arguments);
        return;
      }

      for (const propName in this) {
        if (blackList.includes(propName)) { continue; }

        const property = this[propName];
        doUnsubscribe(property);
      }

      isFunction(original) && original.apply(this, arguments);
    };
  };
}



export const untilDestroyed = (
  componentInstance,
  destroyMethodName = 'ngOnDestroy'
) => <T>(source: Observable<T>) => {
  console.log(componentInstance);

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


export function TakeUntilDestroy( constructor : any ) {
  let originalDestroy = constructor.prototype.ngOnDestroy;

  if ( typeof originalDestroy !== 'function') {
    console.warn(`${constructor.name} is using @TakeUntilDestroy but does not implement OnDestroy`);
  }

  constructor.prototype.componentDestroy = function () {
      this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
      return this._takeUntilDestroy$.asObservable();
  };

  constructor.prototype.ngOnDestroy = function () {
      originalDestroy && typeof originalDestroy === 'function' && originalDestroy.apply(this, arguments);
      this._takeUntilDestroy$ && this._takeUntilDestroy$.next() && this._takeUntilDestroy$.complete();
  }
}
