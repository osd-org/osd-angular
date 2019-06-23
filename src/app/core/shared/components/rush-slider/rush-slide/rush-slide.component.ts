import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rush-slide',
  templateUrl: './rush-slide.component.html',
  styleUrls: ['./rush-slide.component.scss']
})
export class RushSlideComponent implements OnInit {

  /**
   * Position of current slide
   */
  private _slidePosition: number;

  /**
   * HTML Element of slide
   */
  public element: HTMLElement;

  constructor(
    private _el: ElementRef
  ) {
    this.element = this._el.nativeElement;
  }

  /**
   * Returns slide position
   */
  get position(): number {
    return this._slidePosition;
  }

  ngOnInit() {
  }

  /**
   * Set slide position (uses for initialization)
   *
   * @param position
   */
  setPosition(position: number) {
    this._slidePosition = 0;
  }


}
