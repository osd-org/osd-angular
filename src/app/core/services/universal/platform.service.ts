import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class PlatformService {
    private _browser: boolean;
    constructor(@Inject(PLATFORM_ID) platformId: any) {
        if (!isPlatformBrowser(platformId)) {
            // const req: any = this.injector.get(this.injector.get(USERAGENTTOKEN));
            // this._window = {navigator: {userAgent: req.get('User-Agent')}};
            this._browser = false;
        } else {
            this._browser = true;
        }
    }

    get isBrowser(): boolean {
        return this._browser;
    }
}
