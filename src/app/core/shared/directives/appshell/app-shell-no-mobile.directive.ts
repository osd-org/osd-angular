import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[appShellNoMobile]'
})
export class AppShellNoMobileDirective implements OnInit {

  constructor(
      private _viewContainer: ViewContainerRef,
      private _templateRef: TemplateRef<any>,
      private _device: DeviceDetectorService
  ) {}

  ngOnInit() {
      if (!this._device.isMobile()) {
          this._viewContainer.createEmbeddedView(this._templateRef);
      } else {
          this._viewContainer.clear();
      }
  }
}
