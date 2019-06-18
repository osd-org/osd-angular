import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../../blog.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@osd-rxjs/operators';
import { PageService } from '@osd-services/page.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  public blogPost: any = null;

  constructor(
    private _blog: BlogService,
    private _route: ActivatedRoute,
    private _background: BackgroundService,
    private _page: PageService
  ) {
   }

  ngOnInit() {
    this._background.changeColor(BackgroundColor.BLACK);
    this._page.contentUpdate$.pipe(
      switchMap(() => this._route.params),
      switchMap(params => this._blog.getBlogPostBySlug(params.slug)),
      untilDestroyed(this)
    ).subscribe((res) => {
      this._blog.resolveCurrentBlogPost(res[0]);
      this.blogPost = res[0];
    })
  }

  ngOnDestroy() {

  }

}
