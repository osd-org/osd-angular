import { Component, OnInit, Input, ElementRef, AfterContentInit } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';

@Component({
  selector: 'app-links-slider',
  templateUrl: './links-slider.component.html',
  styleUrls: ['./links-slider.component.scss']
})
export class LinksSliderComponent implements OnInit, AfterContentInit {

  @Input('links') links;

  private _linkElList: Array<HTMLElement>;

  constructor(
    private _el: ElementRef,
    private _platform: PlatformService
  ) { }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    if (this._platform.isBrowser) {
      this._initLinks();
    }
  }

  private _initLinks() {
    this._linkElList = this._el.nativeElement.querySelectorAll('.link');
  }

}
