import { User } from 'src/app/dto/user.dto';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { AppConfigService } from './app-config.service'
import { Article } from '../dto/Article'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // Http Headers
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private config: AppConfigService) { }
  // add
  addArticle(data: Article): Observable<any> {

    return this.httpClient.post(`${this.config.apiPrefix}articles/add-article`, data)
      .pipe(
        catchError(this.handleError)
      )
  }
  // get all articles
  getArticles() {
    return this.httpClient.get<{
      articlesCount: number,
      articles: Article[]
    }>(`${this.config.apiPrefix}articles`);
  }


  getSingleArticle(id: any): Observable<any> {
    const url = `${this.config.apiPrefix}articles/${id}`;
    return this.httpClient.get<{
      data: Article
    }>(url)
      .pipe(
        map(articles => articles), 
        catchError(this.handleError)
      );
  }

  // get user articles
  getUserArticles(id: any): Observable<any> {
    const url = `${this.config.apiPrefix}users/${id}`;
    return this.httpClient.get<{
      user: User
    }>(url)
      .pipe(
        map(user => user),
        catchError(this.handleError)
      );
  }

  // Update
  updateArticle(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.config.apiPrefix}articles/update/${id}`, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
