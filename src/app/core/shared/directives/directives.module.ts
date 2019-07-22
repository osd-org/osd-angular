import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { horisontalScrollDirective } from './horizontal-scroll.directive';
import { CountUpDirective } from './countUp/count-up.directive';
import { AppShellRenderSSRDirective } from './appshell/app-shell-render-ssr.directive';
import { AppShellNoSSRDirective } from './appshell/app-shell-no-ssr.directive';
import { AppShellMobileDirective } from './appshell/app-shell-mobile.directive';
import { AppShellNoMobileDirective } from './appshell/app-shell-no-mobile.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    horisontalScrollDirective,
    CountUpDirective,
    AppShellRenderSSRDirective,
    AppShellNoSSRDirective,
    AppShellMobileDirective,
    AppShellNoMobileDirective
  ],
  exports: [
    horisontalScrollDirective,
    CountUpDirective,
    AppShellRenderSSRDirective,
    AppShellNoSSRDirective,
    AppShellMobileDirective,
    AppShellNoMobileDirective
  ]
})

export class DirectivesModule { }
