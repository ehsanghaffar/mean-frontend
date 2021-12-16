import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  aboutPageTitle = 'درباره روستای لنجرود';
  aboutPageDesc = 'هرچیزی که از روستای بزرگ لنجرود می‌دانیم، قدمت روستای لنجرود چند سال است؟ جمعیت لنجرود چند نفر است؟';
  constructor(private metatags: Meta, private metaTitle: Title) { }

  ngOnInit(): void {
    this.metaTitle.setTitle(this.aboutPageTitle)
    this.metatags.updateTag(
      { name: 'description', content: this.aboutPageDesc }
    )
  }

}
