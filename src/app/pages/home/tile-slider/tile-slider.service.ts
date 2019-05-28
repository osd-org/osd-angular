import { PlatformService } from '@osd-services/universal/platform.service';
import { WindowService } from '@osd-services/universal/window.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TileSliderService {

  private _tileTransition = 500;

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
   * Устанавливает тайл в начальное положение
   * 
   * @param tile 
   */
  public resetTile(tile: HTMLElement) {
    tile.style.transition = 0 + 'ms';
    tile.style.transform = 'translateX(2000px)';
    tile.style.transition = this._tileTransition + 'ms';
  }

  /**
   * Анимация показа тайла
   * 
   * @param tile 
   */
  public showTile(tile: HTMLElement) {
    tile.style.transform = 'translateX(0)';
  }

  /**
   * Анимация скрытия тайла
   * 
   * @param tile 
   */
  public hideTile(tile: HTMLElement) {
    tile.style.transform = 'translateX(-2000px)';
  }
}
