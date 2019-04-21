import { BackgroundColor, BackgroundService } from './../../core/shared/layouts/layout-components/background/background.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TimelineMax, Power2 } from 'gsap';
import { PlatformService } from '@osd-services/universal/platform.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  @ViewChild('animeObject') AnimationObject: ElementRef;

  public backgroundColor = BackgroundColor;

  constructor(
    private _platform: PlatformService,
    private _background: BackgroundService
  ){


  }

   ngOnInit(){
    //  this.layerAnimation();
  }



  layerAnimation(){
    if (this._platform.isBrowser) {
      let anime: TimelineMax = new TimelineMax();
      anime.from(this.AnimationObject.nativeElement, 1, {x: -200, opacity: 0});
    }
  }

}
