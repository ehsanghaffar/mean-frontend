import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/dto/Article';
import { ArticleService } from '../../../services/article.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.sass']
})
export class ArticleListComponent implements OnInit {
  articleListTitle = 'مقالات روستای لنجرود'
  articles: Article | any
  loading: boolean = false;

  constructor(
    private articlesService: ArticleService,
    private metaTitle: Title
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.articlesService.getArticles().subscribe(res => {
      this.loading = false;
      this.articles = res.articles
      this.metaTitle.setTitle(this.articleListTitle)
    })
  }

}
