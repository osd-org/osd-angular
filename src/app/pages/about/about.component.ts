import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { CountUpOptions } from '@osd-directives/countUp/countUp';
import { untilDestroyed } from '@osd-rxjs/operators'

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
    private _seo: SeoService
  ) { }

  ngOnInit() {
    this._header.setTitle('Про нас');
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

}
