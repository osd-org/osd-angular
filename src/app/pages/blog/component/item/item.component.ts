import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public blogPost: any = null;

  constructor(
    private _blog: BlogService,
    private _route: ActivatedRoute
  ) {
    this._route.params.pipe(
    ).subscribe(params => {
      if (this._blog.checkLoadedPosts(params.slug)) {
        this.blogPost = this._blog.checkLoadedPosts(params.slug)[0];
        this._blog.resolveCurrentBlogPost(this.blogPost);
      } else {
        this._blog.getBlogPostBySlug(params.slug).subscribe(res => {
          this._blog.resolveCurrentBlogPost(res[0]);
          this.blogPost = res[0];
        });
      }
    })
   }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.blogPost);

    }, 2000);
  }

}
