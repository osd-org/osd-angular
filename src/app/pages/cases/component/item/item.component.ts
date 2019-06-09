import { BackgroundService, BackgroundColor } from './../../../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../case.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public casePost: any = null;

  constructor(
    private _case: CaseService,
    private _route: ActivatedRoute,
    private _background: BackgroundService
  ) {
    this._route.params.pipe(
    ).subscribe(params => {
      if (this._case.checkLoadedPosts(params.slug)) {
        this.casePost = this._case.checkLoadedPosts(params.slug)[0];
        this._case.resolveCurrentCasePost(this.casePost);
      } else {
        this._case.getCasePostBySlug(params.slug).subscribe(res => {
          this._case.resolveCurrentCasePost(res[0]);
          this.casePost = res[0];
        });
      }
    })
   }

  ngOnInit() {
    this._background.changeColor(BackgroundColor.BLACK);
  }

}
