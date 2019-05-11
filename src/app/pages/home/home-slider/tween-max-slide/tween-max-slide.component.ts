import { Component, ViewChild, ElementRef, OnInit, ViewChildren, Renderer2, AfterViewInit } from '@angular/core';
import { TimelineMax, Power2, TweenLite, Elastic, Back, TweenMax, Bounce, Power0, SlowMo } from 'gsap';
import { PlatformService } from '@osd-services/universal/platform.service';
import { element } from '@angular/core/src/render3';
import { ApiService } from '@osd-services/api.service';

@Component({
  selector: 'app-tween-max-slide',
  templateUrl: './tween-max-slide.component.html',
  styleUrls: ['./tween-max-slide.component.scss']
})
export class TweenMaxSlideComponent implements OnInit, AfterViewInit {


@ViewChildren('animeBlockObject') AnimeBlockObject: ElementRef;

  @ViewChild('animeObject') AnimationObject: ElementRef;
  @ViewChild('animeObject2') AnimationObject2: ElementRef;

  tl;
  block: any[];
  flashAnimation: any;
  TweenLite = TweenLite;
  public sliderList: any[] = [];

  constructor(
    private _platform: PlatformService,
    private _renderer: Renderer2,
    private _api: ApiService
  ) { }

  ngOnInit() {
    this._api.get('/slider/list').subscribe(e => {
      this.sliderList = e;
    })
  }

  ngAfterViewInit() {
    // this.block = this.AnimationObject.nativeElement.querySelectorAll('.block');
    // this.layerAnimation();
    // this.startFlashing()

  }

  layerAnimation(){
    if (this._platform.isBrowser) {

      this.tl = new TimelineMax();
      // let anime: TimelineMax = new TimelineMax();
      // anime.from(this.AnimationObject.nativeElement, 1, {x: -200, opacity: 0});
      // const block = this.AnimationObject.nativeElement.querySelectorAll('.block');
      // //add a tween
      console.log(this.block);
      // this.block.forEach(el => {

      // });

      // //append a tween using the convenience method to() (shorter syntax) and offset it by 0.5 seconds
      // tl.to(block, 1, {rotation:30}, "+=0.5");
    }


  }

  myFunction() {
    // if (this._platform.isBrowser) {

      // this.tl = new TimelineMax({repeat:2, repeatDelay:1, onComplete: this.myFunction});
      // let anime: TimelineMax = new TimelineMax();
      // anime.from(this.AnimationObject.nativeElement, 1, {x: -200, opacity: 0});
      // const block = this.AnimationObject.nativeElement.querySelectorAll('.block');
      // //add a tween
      // anime.tl.add(TweenLite.to(this.block, 1, {x:1000, ease:"hop", visibility: 'hidden'}));
      // anime.tl.add( TweenLite.to(this.block, 1, {x:0, ease:"hop", visibility: 'visible'}) );
      // //append a tween using the convenience method to() (shorter syntax) and offset it by 0.5 seconds
      // tl.to(block, 1, {rotation:30}, "+=0.5");
    // }
  }

  private startFlashing() {
    return (
      this.TweenLite.to(this.block, 0.1, {x: '690%', visibility: 'hidden'}),
      this.TweenLite.to(this.block, 0.7, {x: '690%', visibility: 'visible'}),
      this.TweenLite.to(this.block, 0.9, {x: '350%', visibility: 'visible'}),
      this.TweenLite.to(this.block, 1.5, {x: '150%', visibility: 'visible'}),
      this.TweenLite.to(this.block, 1.5, {x: '50%', visibility: 'visible'}),
      this.TweenLite.to(this.block, 1.5, {x: '10%', visibility: 'visible'}),
      this.TweenLite.to(this.block, 2.9, {x: '0%', ease:Elastic.easeInOut, visibility: 'visible', delay: 4}),
      this.TweenLite.to(this.block, 3.5, {x: '-30%', ease:Elastic.easeInOut, visibility: 'visible'}),
      this.TweenLite.to(this.block, 4.5, {x: '-350%', visibility: 'visible'}),
      this.TweenLite.to(this.block, 6.5, {x: '-690%', ease:Elastic.easeInOut, visibility: 'visible', delay: 7})
    );
  }

}
