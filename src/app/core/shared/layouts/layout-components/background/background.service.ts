import { Injectable } from '@angular/core';

export enum BackgroundColor {
  PURPLE = '#1C0C57',
  YELLOW = '#FF7500',
  PINK = '#EC008C',
  BLUE = '#0A51EB',
  DARKBLUE = '#16467f',
  BLACK = '#000000',
  ORANGE = '#f9b900'
}

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  private _color: BackgroundColor = BackgroundColor.PURPLE;

  constructor() { }

  get color(): BackgroundColor {
    return this._color;
  }

  public changeColor(color: BackgroundColor) {
    this._color = color;
  }
}
