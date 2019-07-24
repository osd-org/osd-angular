import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';

@Directive({
  selector: '[appShellRenderSSR]'
})
export class AppShellRenderSSRDirective implements OnInit {

  constructor(
      private _viewContainer: ViewContainerRef,
      private _templateRef: TemplateRef<any>,
      private _platform: PlatformService
  ) {}

  ngOnInit() {
      if (!this._platform.isBrowser) {
          this._viewContainer.createEmbeddedView(this._templateRef);
      } else {
          this._viewContainer.clear();
      }
  }
}
