import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public blogList: any[] = [];

  constructor(
    private _blog: BlogService
  ) { }

  ngOnInit() {
    this._blog.getBlogList().subscribe( res => {
      this.blogList = res;
    });
  }

}
