import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { Article } from './Article'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // api
  apiUrl: string = 'https://api.lanjrud.ir';
  // apiUrl: string = 'http://localhost:8000';

  // Http Headers
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // add
  addArticle(data: Article): Observable<any> {

    return this.httpClient.post(`${this.apiUrl}/articles/add-article`, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // get all articles
  getArticles() {
    return this.httpClient.get(`${this.apiUrl}/articles`);
  }

  getSingleArticle(id: any): Observable<Article> {
    const url = `${this.apiUrl}/articles/${id}`;
    return this.httpClient.get<any>(url)
      .pipe(
        map(articles => articles), // returns a {0|1} element array
        catchError(this.handleError)
      );
  }

  // Update
  updateArticle(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/articles/update/${id}`, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Error
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
