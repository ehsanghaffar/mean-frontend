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
  articleAuthor: string;
  loading: boolean = false;
  author: any;
  // article: any;
  constructor(
    private articlesService: ArticleService,
    private route: ActivatedRoute,
    private metatags: Meta,
    private titleService: Title) { }

  ngOnInit(): void {
     this.getArticle()
  }

  async getArticle(): Promise<void> {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id')
    // const id = this.article._id
    this.articlesService.getSingleArticle(id)
      .subscribe(async article => {
        this.loading = false;
        this.article = article.data
        this.articleAuthor = this.article.author
        console.log(this.articleAuthor)
        await this.getAuther();
        // this.titleService.setTitle(this.articleTitle)
        // this.metatags.updateTag(
        //   { name: 'description', content: this.articleDesc }
        // )
      })
  }

  // get auther
   getAuther(): void {
    this.articlesService.getUserArticles(this.articleAuthor)
      .subscribe(author => {
        console.log(author)
        this.author = author
      }
      )
}

}


