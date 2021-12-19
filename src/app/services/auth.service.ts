import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from './app-config.service';
import jwt_decode from 'jwt-decode';
import { User } from '../dto/user.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;
  private isAuthor: boolean = false;
  private token?: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  private authorStatusListener = new Subject<boolean>();
  error: any

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: AppConfigService
  ) { }

  private extractRolesFromToken() {
    if (!this.token) return;
    try {
      const tokenInfo: any = jwt_decode(this.token);
      this.isAdmin = tokenInfo?.roles?.includes('admin');
      this.isAuthor = tokenInfo?.roles?.includes('author');
      this.adminStatusListener.next(this.isAdmin);
      this.authorStatusListener.next(this.isAuthor);
    } catch (error) {
      console.error(error);
    }
  };

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getIsAuthor() {
    return this.isAuthor;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthorStatusListener() {
    return this.authorStatusListener.asObservable();
  }

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

  // register new user
  register(user: User) {
    this.http
      .post<any>(`${this.config.apiPrefix}users/signup`, user).subscribe(
        (response) => {
          const token = response.accessToken;
          this.token = token;
          if (token) {
            const expiresIn = response.expiresIn ?? 0;
            this.setAuthTimer(expiresIn);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresIn * 1000
          );
          this.saveAuthData(token, expirationDate);
          this.extractRolesFromToken();
          this.router.navigate(['/login']);
          }
        },
        (error) => {
          this.error = error;
          console.log(error)
        }
      )
  }

  // login to account
  login(user: User) {
    this.http
      .post<any>(`${this.config.apiPrefix}users/login`, user)
      .subscribe((response) => {
        const token = response.accessToken;
        this.token = token;
        if (token) {
          const expiresIn = response.expiresIn ?? 0;
          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.authStatusListener.next(this.isAuthenticated);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresIn * 3000
          );
          console.log(expirationDate)
          this.saveAuthData(token, expirationDate);
          this.extractRolesFromToken();
          this.router.navigate(['/'])
        }
      },
      (error) => {
        this.error = error;
        console.log(error)
      }
      );

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.authStatusListener.next(this.isAuthenticated);
      this.extractRolesFromToken();
    }
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

}
