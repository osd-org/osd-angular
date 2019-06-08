import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public blogList: any[] = [];
  public paginationPages: any[] = [];
  private _per_page: number = 9;

  constructor(
    private _blog: BlogService,
    private _header: HeaderService
  ) { }

  ngOnInit() {
    this._header.setTitle('Блоги');
    this._blog.getBlogList({per_page: this._per_page}).subscribe( (res: any) => {
      this.blogList = res.body;
      this.paginationPages = res.headerParams.pages;
      this.paginationPages = Array(this.paginationPages);
    });
  }

  public loadPaginationPage(pageNumber: number) {
    this._blog.getBlogList({per_page: this._per_page, page: pageNumber}).subscribe( (res: any) => {
      this.blogList = res.body;
      this.paginationPages = res.headerParams.pages;
      this.paginationPages = Array(this.paginationPages);
    });
  }

}
