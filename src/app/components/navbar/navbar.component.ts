import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  title = "وبسایت لنجرود"
  constructor( public breakpointObserver: BreakpointObserver) { }
  isMobile: boolean = false;


  ngOnInit(): void {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

}
