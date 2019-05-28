import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public blogList: any[] = [];
  public paginationPages: any[] = [];
  private _per_page: number = 1;

  constructor(
    private _blog: BlogService
  ) { }

  ngOnInit() {
    this._blog.getBlogList({per_page: this._per_page}).subscribe( (res: any) => {
      this.blogList = res.body;
      this.paginationPages = res.headerParams.pages;
      this.paginationPages = Array(2);
    });
  }

  public loadPaginationPage(pageNumber: number) {
    this._blog.getBlogList({per_page: this._per_page, page: pageNumber}).subscribe( (res: any) => {
      this.blogList = res.body;
      this.paginationPages = res.headerParams.pages;
      this.paginationPages = Array(2);
    });
  }

}
