import { ModalsService } from './../modals.service';
import { BaseModalComponent } from './../base-modal/base-modal.component';
import { Component, OnInit } from '@angular/core';
import { showHide } from '../modal-animations';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
  animations: [showHide]
})
export class PhotoModalComponent extends BaseModalComponent implements OnInit {

  constructor(
    public modals: ModalsService
  ) { 
    super(modals);
  }

  get url(): string {
    return this.modals.currentModalData;
  }

  ngOnInit() {
  }

}
