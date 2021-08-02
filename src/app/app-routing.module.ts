import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { AboutComponent } from './routes/about/about.component';
import { ArticlesComponent } from './routes/articles/articles.component';
import { SingleComponent } from './routes/articles/single/single.component';
import { HomeComponent } from './routes/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/create', component: AddArticleComponent },
  { path: 'articles/:id', component: SingleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
