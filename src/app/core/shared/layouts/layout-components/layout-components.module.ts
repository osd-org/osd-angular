import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@osd-directives/directives.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BackgroundComponent } from './background/background.component';
import { PipesModule } from '@osd-pipes/pipes.module';
import { TranslationModule } from '../../translation/translation.module';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BackgroundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule,
    TranslationModule,
    PipesModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BackgroundComponent,
  ]
})
export class LayoutComponentsModule { }
