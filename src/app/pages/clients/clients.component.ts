import { PlatformService } from './../../core/services/universal/platform.service';
import { HeaderService } from './../../core/shared/layouts/layout-components/header/header.service';
import { BackgroundService, BackgroundColor } from './../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  private _testimonialsList;
  private _track: HTMLElement;

  private _testimonialWidth: number;

  public activeSlide = 0;

  constructor(
    private _background: BackgroundService,
    private _header: HeaderService,
    private _platform: PlatformService
  ) { }

  ngOnInit() {
    this._header.setTitle('Клиенты');
    this._background.changeColor(BackgroundColor.BLACK);

    this.initTestimonialsSlider();
  }

  initTestimonialsSlider() {
    if (this._platform.isBrowser) {
      this._testimonialsList = document.querySelectorAll('.js-testimonial');
      this._testimonialWidth = this._testimonialsList[0].scrollWidth;
      this._track = document.querySelector('.js-track');
    }
  }

  goTo(testimonialPosition: number) {
    this._track.style.transform = `translateX(-${testimonialPosition * this._testimonialWidth}px)`;
    this.activeSlide = testimonialPosition;
  }

  next() {
    if (this.activeSlide + 1 < this._testimonialsList.length) {
      this.goTo(this.activeSlide + 1);
    }
  }

  prev() {
    if (this.activeSlide - 1 >= 0) {
      this.goTo(this.activeSlide - 1);
    }
  }

  ngOnDestroy() {
    this._header.setTitle('');
    this._background.changeColor(BackgroundColor.PURPLE);
  }

}
