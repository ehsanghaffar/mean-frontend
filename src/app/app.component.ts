import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CanonicalService } from './services/canonical.service';
import { Meta } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  isCancel: boolean = false;
  isError: boolean = false;
  
  constructor(
    private canonicalService: CanonicalService,
    private metatag: Meta,
    private authService: AuthService,
    public router: Router
    ) { }


  ngOnInit(): void {
    this.canonicalService.setCanonicalURL()
    this.authService.autoAuthUser()
    this.metatag.addTags([
      { name: 'description', content: 'اولین و تنها وبسایت روستای بزرگ لنجرود' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Ehsan Ghaffar' },
    ])
  }

}
