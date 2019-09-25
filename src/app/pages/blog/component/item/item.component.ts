import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../../blog.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@osd-rxjs/operators';
import { PageService } from '@osd-services/page.service';
import { switchMap } from 'rxjs/operators';
import { PlatformService } from '@osd-services/universal/platform.service';
import { SeoService } from '@osd-services/seo.service';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';


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
    private _page: PageService,
    public platform: PlatformService,
    private _header: HeaderService
  ) {
   }

  ngOnInit() {
    this._background.changeColor(BackgroundColor.BLACK);
    // this._blog.blogNotSupportLangRedirect(this);
    this._page.contentUpdate$.pipe(
      switchMap(() => this._route.params),
      switchMap(params => this._blog.getBlogPostBySlug(params.slug)),
      untilDestroyed(this)
    ).subscribe((res) => {
      this.blogPost = null;
      this._blog.resolveCurrentBlogPost(res[0]);
      this.blogPost = res[0];
      if (!this._header.title) {
        this._header.setTitle('Блоги');
      }
    })
  }

  ngOnDestroy() {

  }

}
