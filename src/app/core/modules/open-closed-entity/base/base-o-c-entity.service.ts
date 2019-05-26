import { Injectable } from '@angular/core';
import { OCEntityInterface } from '../interfaces/o-c-entity-interface';
import { BodyService } from '@osd-services/body.service';

@Injectable({
  providedIn: 'root'
})
export class BaseOCEntityService implements OCEntityInterface {

  private _isOpen: boolean;

  constructor(
    protected _body: BodyService
  ) {
  }

  /**
   * Returns is open current state
   */
  get isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Set open state
   */
  open() {
    if (!this._isOpen) {
      setTimeout(() => {
        this._body.disableScroll();
        this._isOpen = true;
      });
    }
  }

  /**
   * Set closed state
   */
  close() {
    if (this._isOpen) {
      this._body.enableScroll();
      this._isOpen = false;
    }
  }
}
