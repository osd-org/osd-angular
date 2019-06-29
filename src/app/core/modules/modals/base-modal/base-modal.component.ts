import { ModalsService } from './../modals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-modal',
  template: '',
  styleUrls: []
})
export class BaseModalComponent implements OnInit {

  constructor(
    public modals: ModalsService
  ) { }

  ngOnInit() {
  }

  close () {
    this.modals.close();
  }

}
