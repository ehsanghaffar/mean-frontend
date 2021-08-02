import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/services/Article';
import { ArticleService } from '../../../services/article.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.sass']
})
export class ArticleListComponent implements OnInit {
  articleListTitle = 'مقالات روستای لنجرود'
  articles: Article | any;

  constructor(
    private articlesService: ArticleService,
    private metatags: Meta,
    private metaTitle: Title
  ) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe(res => {
      console.log(res);
      this.articles = res
      this.metaTitle.setTitle(this.articleListTitle)
    })
  }

}
