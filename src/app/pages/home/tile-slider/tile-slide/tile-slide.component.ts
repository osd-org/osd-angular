import { PlatformService } from '@osd-services/universal/platform.service';
import { TileSliderService } from './../tile-slider.service';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tile-slide',
  templateUrl: './tile-slide.component.html',
  styleUrls: ['./tile-slide.component.scss']
})
export class TileSlideComponent implements OnInit {

  private _tileList: Array<HTMLElement> = [];

  constructor(
    private _el: ElementRef,
    private _slider: TileSliderService,
    private _platform: PlatformService
  ) { }

  ngOnInit() {
    this._slider.makeSlideTiles('https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg', this._el.nativeElement);

    if (this._platform.isBrowser) {
      this._tileList = this._el.nativeElement.querySelectorAll('.tile');
    }
  }

  /**
   * Показ слайда
   */
  public show() {
    this._tileList.forEach((tile, index) => {
      setTimeout(() => {
        this._slider.showTile(tile);
      }, (index + 1) * 500);
    });
  }

  /**
   * Скрытие слайда
   */
  public hide() {
    this._tileList.forEach((tile, index) => {
      setTimeout(() => {
        this._slider.hideTile(tile);
      }, (index + 1) * 500);
    });
  }

}
