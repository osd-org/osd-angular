import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'app/core/shared/translation/translation.service';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  constructor(
    public sidebar: SidebarService,
    public translate: TranslationService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
  }


}
