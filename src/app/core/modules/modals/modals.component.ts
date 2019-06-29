import { ModalsService } from './modals.service';
import { Component, OnInit } from '@angular/core';
import { fadeInOut } from './modal-animations';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  animations: [fadeInOut]
})
export class ModalsComponent implements OnInit {

  constructor(
    private _modals: ModalsService
  ) { }

  get modal(): string {
    return this._modals.currentModal;
  }

  ngOnInit() {
  }

  onOverlayClick() {
    this._modals.close();
  }

}
