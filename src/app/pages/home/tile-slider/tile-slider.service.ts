import { PlatformService } from '@osd-services/universal/platform.service';
import { WindowService } from '@osd-services/universal/window.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TileSliderService {

  private _tileTransition = 400;
  private _lineTransition = 400;
  private _lineScaleTransition = 200;

  constructor(
    private _window: WindowService,
    private _platform: PlatformService
  ) { }

  /**
   * Создает набор клеток для слайда
   * 
   * @param url ссылка на картинку
   * @param container елемент, в который добавляется слайд
   * @param width количество клеток по ширине
   * @param height количество клеток по высоте
   */
  public makeSlideTiles(url: string, container: HTMLElement, width = 4, height = 3) {
    if (!this._platform.isBrowser) {
      return;
    }

    const tileWidth = this._window.nativeWindow.innerWidth / width;
    const tileHeight = this._window.nativeWindow.innerHeight / height;

    let transitionDelay = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x ++) {
        transitionDelay ++;

        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.position = 'absolute';
        tile.style.zIndex = '0';
        tile.style.top = y * tileHeight + 'px';
        tile.style.left = x * tileWidth + 'px';
        tile.style.width = tileWidth + 'px';
        tile.style.height = tileHeight + 'px';
        tile.style.backgroundSize = '100vw 100vh';
        tile.style.backgroundImage = `url(${url})`;
        tile.style.backgroundPositionX = - (x * tileWidth) + 'px';
        tile.style.backgroundPositionY = - (y * tileHeight) + 'px';
        tile.style.transform = 'translateX(2000px)';
        tile.style.transition = this._tileTransition + 'ms';

        container.appendChild(tile);
      }
    }
  }

  /**
   * 
   * @param lines 
   * @param container 
   */
  public makeSlideLines(lines: Array<any>, container: HTMLElement) {
    if (!this._platform.isBrowser) {
      return;
    }

    const lineHeight = 70;

    lines.forEach((line, index) => {
      const lineEl = document.createElement('span');
      lineEl.classList.add('line');
      lineEl.innerHTML = line.text;
      lineEl.style.color = 'rgba(255, 255, 255, 0)';
      lineEl.style.backgroundColor = line.color;
      lineEl.style.position = 'absolute';
      lineEl.style.zIndex = '0';
      lineEl.style.fontSize = '30px';
      lineEl.style.lineHeight = lineHeight + 'px';
      lineEl.style.transformOrigin = 'bottom left';
      lineEl.style.transform = 'translateX(2000px) scaleY(0.1)';
      lineEl.style.padding = '0 25px';
      lineEl.style.boxSizing = 'border-box';
      lineEl.style.height = lineHeight + 'px';
      lineEl.style.top = 180 + lineHeight * index + 'px';
      lineEl.style.left = window.innerWidth / 2 - 400 + 'px';

      container.appendChild(lineEl);
    });
  }

  /**
   * Устанавливает тайл в начальное положение
   * 
   * @param tile 
   */
  public resetTile(tile: HTMLElement) {
    tile.style.transition = 0 + 'ms';
    tile.style.transform = 'translateX(2000px)';
  }

  /**
   * Анимация показа тайла
   * 
   * @param tile 
   */
  public showTile(tile: HTMLElement) {
    tile.style.transition = this._tileTransition + 'ms';
    tile.style.transform = 'translateX(0)';
  }

  /**
   * Анимация скрытия тайла
   * 
   * @param tile 
   */
  public hideTile(tile: HTMLElement) {
    tile.style.transform = 'translateX(-2000px)';

    setTimeout(() => {
      this.resetTile(tile);
    }, 2000);
  }

  /**
   * 
   * @param line 
   */
  public resetLine(line: HTMLElement) {
    line.style.transition = 0 + 'ms';
    line.style.transform = 'translateX(2000px) scaleY(0.1)';
  }

  /**
   * 
   * @param line 
   */
  public showLine(line: HTMLElement) {
    line.style.transition = this._lineTransition + 'ms';
    line.style.transform = 'translateX(0) scaleY(0.1)';

    setTimeout(() => {
      line.style.transition = this._lineScaleTransition + 'ms';
      line.style.transform = 'translateX(0) scaleY(1)';

      setTimeout(() => {
        line.style.color = 'rgba(255, 255, 255, 1)';
      }, this._lineTransition);
    }, this._lineTransition + 50);
  }

  /**
   * 
   * @param line 
   */
  public hideLine(line: HTMLElement) {
    line.style.transition = this._lineScaleTransition + 'ms';
    line.style.color = 'rgba(255, 255, 255, 0)';

    setTimeout(() => {
      line.style.transform = 'translateX(0) scaleY(0.1)';

      setTimeout(() => {
        line.style.transition = this._lineTransition + 'ms ease-out';
        line.style.transform = 'translateX(-2000px) scaleY(0.1)';

        setTimeout(() => {
          this.resetLine(line);
        }, this._lineTransition);
      }, this._lineScaleTransition + 50);
    }, this._lineScaleTransition);
  }
}
