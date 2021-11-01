import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppConfigService} from './services/app-config.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { AboutComponent } from './routes/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { EditArticleComponent } from './components/article/edit-article/edit-article.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticlesComponent } from './routes/articles/articles.component';
import { SingleComponent } from './routes/articles/single/single.component';
import { NgxShimmerLoadingModule } from  'ngx-shimmer-loading';
import { ArticlesShimmerComponent } from './components/article/article-list/articles-shimmer/articles-shimmer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { NotFoundComponent } from './routes/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    AddArticleComponent,
    EditArticleComponent,
    ArticleListComponent,
    ArticlesComponent,
    SingleComponent,
    ArticlesShimmerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxShimmerLoadingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          //Make sure to return a promise!
          return appConfigService.loadAppConfig();
        };
      },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
