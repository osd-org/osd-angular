import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { RushSlideComponent } from './rush-slide/rush-slide.component';
import { RushSliderConfig } from './rush-slider-config';
import { RushSliderService } from './rush-slider.service';

@Component({
  selector: 'app-rush-slider',
  templateUrl: './rush-slider.component.html',
  styleUrls: ['./rush-slider.component.scss']
})
export class RushSliderComponent implements OnInit, AfterContentInit {

  @ContentChildren(RushSlideComponent) slideList: QueryList<RushSlideComponent>;

  @Input('config') config: Map<number, RushSliderConfig>;

  @Output('init') init$: EventEmitter<any> = new EventEmitter();

  constructor(
    private _rushSlider: RushSliderService,
    private _el: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._rushSlider.init(this.slideList.toArray(), this._el.nativeElement, this.config);

    setTimeout(() => {
      this.init$.next(this._rushSlider);
    });
  }

}
