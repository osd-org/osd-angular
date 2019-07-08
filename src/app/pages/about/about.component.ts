import { BackgroundService, BackgroundColor } from './../../core/shared/layouts/layout-components/background/background.service';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { CountUpOptions } from '@osd-directives/countUp/countUp';
import { untilDestroyed } from '@osd-rxjs/operators'
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslationService } from 'app/core/shared/translation/translation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  public pageContent: PageType;
  public countOpts: CountUpOptions = {
    duration: 2,
    decimalPlaces: 0,
    smartEasingThreshold: 9999
  };

  constructor(
    private _header: HeaderService,
    private _page: PageService,
    private _seo: SeoService,
    private _background: BackgroundService,
    private _device: DeviceDetectorService,
    private _translate: TranslationService
  ) { }

  ngOnInit() {
    this._header.setTitle('Про нас');
    if (this._device.isMobile()) {
      this._background.changeColor(BackgroundColor.BLACK);
    } else {
      this._background.changeColor(BackgroundColor.DARKBLUE);
    }
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.pageContent = null;
      this._page.loadPageBySlug('about').subscribe((e: PageType) => {
        this._seo.updateTags(e.acf);
        this.pageContent = e;
      })
    })
  }

  ngOnDestroy() {
    this._header.setTitle('');
  }

  public get LANG(): string {
    return this._translate.lang;
  }
}
