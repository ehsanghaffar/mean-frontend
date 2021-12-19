import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean = false;
  private authListenerSub!: Subscription;
  title = "وبسایت لنجرود"
  constructor( public breakpointObserver: BreakpointObserver, private authService: AuthService) { }
  isMobile: boolean = false;


  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
        .subscribe((isAuthenticated) => {
          this.isAuthenticated = isAuthenticated;
        })

    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }
}
