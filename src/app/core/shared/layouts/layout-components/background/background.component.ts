import { BackgroundService } from './background.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  constructor(
    public background: BackgroundService
  ) { }

  ngOnInit() {
  }

}
