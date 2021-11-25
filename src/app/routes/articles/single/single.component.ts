import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../dto/Article';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.sass']
})
export class SingleComponent implements OnInit {
  article: Article[] | any;
  articleTitle?: string;
  articleDesc?: string;
  // article: any;
  constructor(
    private articlesService: ArticleService,
    private route: ActivatedRoute,
    private metatags: Meta,
    private titleService: Title) { }

  ngOnInit(): void {
    this.getArticle()

  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('id')
    // const id = this.article._id
    this.articlesService.getSingleArticle(id)
      .subscribe(article => {
        // console.log(article)
        this.article = article
        this.articleTitle = article.title
        this.articleDesc = article.description
        // this.titleService.setTitle(this.articleTitle)
        // this.metatags.updateTag(
        //   { name: 'description', content: this.articleDesc }
        // )
      })

  }

}


