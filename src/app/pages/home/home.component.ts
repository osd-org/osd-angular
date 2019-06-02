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

  /**
   * Slides list for test
   */
  public slideList = [
    {
      lines: [
        {text: 'СЕГМЕНТИРУЕМ', color: '#ff0000'},
        {text: 'ИССЛЕДУЕМ', color: '#00ff00'},
        {text: 'ПРОДАЕМ', color: '#ff00ff'},
      ],
      link: {
        title: 'Huggies',
        description: 'Метод кенгуру',
        color: 'rgba(255, 0, 255, 0.4)',
        url: '/'
      },
      image: 'https://iso.500px.com/wp-content/uploads/2016/02/stock-photo-133673159-1500x1000.jpg',
    },
    {
      lines: [
        {text: 'АНАЛИЗИРУЕМ', color: '#00ffff'},
        {text: 'МАСШТАБИРУЕМ', color: '#ff00ff'},
        {text: 'ТЕСТИРУЕМ', color: '#aacc00'},
      ],
      link: {
        title: 'Huggies',
        description: 'Метод кенгуру',
        color: 'rgba(100, 100, 0, 0.4)',
        url: '/'
      },
      image: 'https://cdn.serif.com/affinity/img/photo/home/0918/og-affinity-photo-120920181112.jpg',
    },
  ];

  /**
   * Demo data for links slider
   */
  public linksList = [
    {
      url: '/',
      fontSize: 18,
      text: 'Дизайн',
      bottomOffset: 30,
      speed: 16
    },
    {
      url: '/',
      fontSize: 16,
      text: 'Разработка',
      bottomOffset: 70,
      speed: 20
    },
    {
      url: '/',
      fontSize: 14,
      text: 'Интеграция',
      bottomOffset: 50,
      speed: 18
    },
    {
      url: '/',
      fontSize: 15,
      text: 'Визуализация',
      bottomOffset: 40,
      speed: 15
    },
  ];

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
