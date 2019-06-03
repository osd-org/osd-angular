import { BackgroundColor, BackgroundService } from './../../core/shared/layouts/layout-components/background/background.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';
import { ApiService } from '@osd-services/api.service';
import { HeaderService } from './../../core/shared/layouts/layout-components/header/header.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit, OnDestroy {

  public teamList: any[] = [];
  public paginationPages: any[] = [];
  private _per_page: number = 14;
  public backgroundColor = BackgroundColor;

  constructor(
    private _api: ApiService,
    private _platform: PlatformService,
    private _background: BackgroundService,
    private _header: HeaderService
  ){


  }

  ngOnInit(){
    this._header.setTitle('Про нас');
    this._background.changeColor(BackgroundColor.DARKBLUE);
    this._getTeamList({per_page: this._per_page}).subscribe();
  }

  private _getTeamList(param = null) {
    return this._api.get('/team/list', param).pipe(
      map(res => {
        this.teamList = res.body;
        this.paginationPages = Array(res.headerParams.pages);
        return res;
      }),
      catchError(() =>  of({}))
    )
  }

  public loadPaginationPage(pageNumber: number) {
    this._getTeamList({per_page: this._per_page, page: pageNumber}).subscribe( (res: any) => {
      this.teamList = res.body;
      this.paginationPages = Array(res.headerParams.pages);
    });
  }

  ngOnDestroy(): void {
    this._header.setTitle('');
    this._background.changeColor(BackgroundColor.PURPLE);
  }
}
