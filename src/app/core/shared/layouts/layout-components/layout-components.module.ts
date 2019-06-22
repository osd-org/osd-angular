import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@osd-directives/directives.module';
import { HeaderComponent } from './header/header.component';
import { HeaderBlogComponent } from './header-blog/header-blog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BackgroundComponent } from './background/background.component';
import { PipesModule } from '@osd-pipes/pipes.module';
import { TranslationModule } from '../../translation/translation.module';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeaderBlogComponent,
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
    HeaderBlogComponent,
    SidebarComponent,
    BackgroundComponent,
  ]
})
export class LayoutComponentsModule { }
