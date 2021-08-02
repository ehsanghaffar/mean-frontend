import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';


import { ArticleService } from '../../../services/article.service'
import { Article } from '../../../services/Article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.sass']
})
export class AddArticleComponent implements OnInit {

  @Input() articleDetails = { id: '', title: '', description: '', content: '' }

  constructor(
    public articleService: ArticleService,
    public router: Router,
    private metatags: Meta
  ) { }

  ngOnInit() {
    this.addArticle()
  }

  addArticle() {
    this.articleService.addArticle(this.articleDetails).subscribe((data: {}) => {
      this.router.navigate(['/articles'])
    })
  }

}
