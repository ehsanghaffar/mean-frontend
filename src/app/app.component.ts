import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CanonicalService } from './services/canonical.service';
import { Meta } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  isCancel: boolean = false;
  isError: boolean = false;
  time: any
  value: number = 0;

  @ViewChild('spinnerElement')
  spinnerElement: ElementRef
  
  constructor(
    private canonicalService: CanonicalService,
    private metatag: Meta,
    private authService: AuthService,
    public router: Router
    ) {
      
    }

    checkEvents() {
      this.router.events.subscribe(event => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            this.time = setInterval(() => {
              this.loading = true;
              this.value++
            }, 25)
          }
            break;
          case event instanceof NavigationEnd: {
            setTimeout(() => {
              clearInterval(this.time)
              this.loading = false;
              this.value = 0;
            }, 2000)
          }
          break;
          case event instanceof NavigationCancel: {
            clearInterval(this.time)
            this.loading = false;
            this.isCancel = true;
          }
          break;
          case event instanceof NavigationError: {
            clearInterval(this.time)
            this.loading = false;
            this.isError = true;
          }
          break;
          default:
            break;
        }
      }, error => {
        console.log(error)
      })
    }


  ngOnInit(): void {
    this.canonicalService.setCanonicalURL()
    this.authService.autoAuthUser()
    this.metatag.addTags([
      { name: 'description', content: 'اولین و تنها وبسایت روستای بزرگ لنجرود' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Ehsan Ghaffar' },
    ])
    this.checkEvents()
  }

  ngOnDestroy(): void {
    clearInterval(this.time)
  }

  // Shows and hides the loading spinner during RouterEvent changes
  // private _navigationInterceptor(event: RouterEvent): void {
  //   if (event instanceof NavigationStart) {
  //     this.loading = true;
  //   }
  //   if (event instanceof NavigationEnd) {
  //     this.loading = false;
  //   }
  //   // Set loading state to false in both of the below events to
  //   // hide the spinner in case a request fails
  //   if (event instanceof NavigationCancel) {
  //     this.loading = false;
  //   }
  //   if (event instanceof NavigationError) {
  //     this.loading = false;
  //   }
  // }

}
