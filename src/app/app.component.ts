import { Component, OnInit } from '@angular/core';
import { CanonicalService } from './services/canonical.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private canonicalService: CanonicalService, private metatag: Meta) { }

  ngOnInit(): void {
    // canonical url
    this.canonicalService.setCanonicalURL()

    // metatags service
    this.metatag.addTags([
      // { name: 'description', content: 'وبسایت روستای بزرگ لنجرود' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Ehsan Ghaffar' },
    ])
  }
}
