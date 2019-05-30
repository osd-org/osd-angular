import { PlatformService } from '@osd-services/universal/platform.service';
import { TileSliderService } from './../tile-slider.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-tile-slide',
  templateUrl: './tile-slide.component.html',
  styleUrls: ['./tile-slide.component.scss']
})
export class TileSlideComponent implements OnInit {

  @Input('imageUrl') imageUrl;
  @Input('linesList') linesList;
  @Input('linkData') linkData;

  private _tileList: Array<HTMLElement> = [];
  private _lineList: Array<HTMLElement> = [];
  private _link: HTMLElement;

  private _tilesDelay = {
    '0': 600,
    '1': 1100,
    '2': 1600,
    '3': 2300,
    '4': 800,
    '5': 1300,
    '6': 1900,
    '7': 2600,
    '8': 1000,
    '9': 1800,
    '10': 2100,
    '11': 2900,
  }

  private _linesDelay = {
    '0': 0,
    '1': 200,
    '2': 400
  }

  constructor(
    private _el: ElementRef,
    private _slider: TileSliderService,
    private _platform: PlatformService
  ) { }

  ngOnInit() {
    this._slider.makeSlideTiles(this.imageUrl, this._el.nativeElement);
    this._slider.makeSlideLines(this.linesList, this._el.nativeElement);

    if (this._platform.isBrowser) {
      this._tileList = this._el.nativeElement.querySelectorAll('.tile');
      this._lineList = this._el.nativeElement.querySelectorAll('.line');
      this._link = this._el.nativeElement.querySelector('.link');

      this._link.style.backgroundColor = this.linkData.color;
    }
  }

  /**
   * Показ слайда
   */
  public show() {
    this._tileList.forEach((tile, index) => {
      setTimeout(() => {
        this._slider.showTile(tile);
      }, this._tilesDelay[index]);
    });

    this._lineList.forEach((line, index) => {
      setTimeout(() => {
        this._slider.showLine(line);
      }, this._linesDelay[index]);
    });

    this._slider.showTile(this._link);
  }

  /**
   * Скрытие слайда
   */
  public hide() {
    this._tileList.forEach((tile, index) => {
      setTimeout(() => {
        this._slider.hideTile(tile);
      }, this._tilesDelay[index]);
    });

    this._lineList.forEach((line, index) => {
      setTimeout(() => {
        this._slider.hideLine(line);
      }, this._linesDelay[index]);
    });

    this._slider.hideTile(this._link);
  }

}
