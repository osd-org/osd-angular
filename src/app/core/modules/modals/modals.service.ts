import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private _currentModalData: any = null;

  private _onClose$: Subject<any> = new Subject();

  public currentModal = '';

  constructor() {
  }

  /**
   * Get current modal Data
   */
  get currentModalData(): any {
    return this._currentModalData;
  }

  /**
   *  Returns emiter that emits whe modal clodes
   * */
  get onClose$(): Subject<any> {
    return this._onClose$;
  }

  /**
   * Open modal by name
   *
   * @param modal
   * @param data
   */
  public open(modal: string, data = null) {
    this._onClose$.next(null);

    this._currentModalData = data;
    this.currentModal = modal;
  }

  /**
   * Close modal and clear modalData
   */
  public close(data = null) {
    this._onClose$.next(data);

    this._currentModalData = null;
    this.currentModal = '';
  }
}
