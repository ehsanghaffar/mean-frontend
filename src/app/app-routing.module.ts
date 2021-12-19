import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './routes/about/about.component';
import { ArticlesComponent } from './routes/articles/articles.component';
import { SingleComponent } from './routes/articles/single/single.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { PanelComponent } from './routes/auth/panel/panel.component';
import { RegisterComponent } from './routes/auth/register/register.component';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/create', component: AddArticleComponent, canActivate: [AuthGuard] },
  { path: 'articles/:id', component: SingleComponent },
  // auth routes
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'panel', component: PanelComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
