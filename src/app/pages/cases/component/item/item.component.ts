import { BackgroundService, BackgroundColor } from '../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CaseService } from '../../case.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@osd-rxjs/operators';
import { PageService } from '@osd-services/page.service';
import { switchMap } from 'rxjs/operators';
import { CaseSlideContentType } from '../../case.service';
import { RushSliderConfig } from '../../../../core/shared/components/rush-slider/rush-slider-config';
import { RushSliderService } from '../../../../core/shared/components/rush-slider/rush-slider.service';
import {fromEvent} from 'rxjs';
import {PlatformService} from '@osd-services/universal/platform.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  public sliderLoad = false;
  public casePost: any[] = null;


  public contentType = CaseSlideContentType;
  public slider: RushSliderService;
  public sliderConfig: Map<number, RushSliderConfig>;
  public slideList: Array<any> = [];

  constructor(
    private _case: CaseService,
    private _route: ActivatedRoute,
    private _background: BackgroundService,
    private _page: PageService,
    private _platform: PlatformService
  ) {
    this._initConfig();
  }


  ngOnInit() {
    this._background.changeColor(BackgroundColor.BLACK);
    this._page.contentUpdate$.pipe(
      switchMap(() => this._route.params),
      switchMap(params => this._case.getCasePostBySlug(params.slug)),
      untilDestroyed(this)
    ).subscribe((res) => {
      this._case.resolveCurrentCasePost(res[0]);
      this.casePost = res[0]['acf']['slide'];
      this._reloadSlider();
    });

    if (this._platform.isBrowser) {
      this._scrollHandler();
    }

    this._reloadSlider();
  }

  sliderInit(e) {
    if (!this.slider) {
      this.slider = e;
    }
  }

  private _initConfig() {
    this.sliderConfig = new Map();
    this.sliderConfig.set(1400, {
      speed: 1000,
      infinite: false,
      ignoreSwipe: true
    })
  }

  private _reloadSlider() {
    this.sliderLoad = false;
    setTimeout(() => {
      this.sliderLoad = true;
    });
  }

  private _scrollHandler() {
    fromEvent(document, 'wheel').pipe(
      untilDestroyed(this)
    ).subscribe((e: MouseWheelEvent) => {
      if (e.deltaY > 0) {
        this.slider.nextSlide();
      } else {
        this.slider.prevSlide();
      }
    });
  }


  ngOnDestroy() {

  }

}
