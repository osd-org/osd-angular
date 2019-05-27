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

  public menuList: any[] = [
    { name: 'КЕЙСЫ', link: 'cases', color: '#000'},
    { name: 'СЕРВИСЫ', link: 'services', color: '#8104f9'},
    { name: 'ПРО НАС', link: 'about', color: '#1c0c57'},
    { name: 'БЛОГ', link: 'blog', color: '#ec008c'},
    { name: 'КЛИЕНТЫ', link: 'clients', color: '#16467f'},
    { name: 'КОНТАКТЫ', link: 'contact', color: '#ee8028'},
  ]

  constructor(
    public sidebar: SidebarService,
    public translate: TranslationService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
  }


  public get LANG(): string {
    return this.translate.lang;
  }


  public get linkHeight() : string {
    return 100 / this.menuList.length + '%';
  }




}
