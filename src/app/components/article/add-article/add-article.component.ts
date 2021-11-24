import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { ArticleService } from '../../../services/article.service'
import { Article } from '../../../types/Article';
import { NgForm } from '@angular/forms';

declare const MediumEditor: any;


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.sass']
})
export class AddArticleComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  error: any;
  article: Article

  editor: any;
  content: any;
  @ViewChild('editable', { static: true })
  editable!: ElementRef;

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement, {

      toolbar: {
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'h4', 'h5', 'quote',
          {
            name: 'pre',
            action: 'append-pre',
            aria: 'pre type 1',
            tagNames: ['pre'],
            contentDefault: '<b>pre</b>',
            classList: ['custom-class-pre']
          }, 'unorderedlist'
        ],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        align: 'center',
      },
      anchor: {
        placeholderText: 'Type a link',
        customClassOption: 'storked-blue',
        customClassOptionText: 'Create Button'
      },
      anchorPreview: {
        hideDelay: 500,
        previewValueSelector: 'a'
      }

    })
  }


  // articleDetails: Article = { title: '', description: '', content: '' }

  constructor(
    public articleService: ArticleService,
    public router: Router,
    private metatags: Meta
  ) { }

  ngOnInit() {

  }

  addArticle(form: NgForm) {
    if (!form) return;
    this.loading = true;
    const payload: Article = {
      title: form.value.title,
      description: form.value.description,
      content: this.editor.getContent(form.value.content)
    }
    this.articleService.addArticle(payload).subscribe((data: {}) => {
      this.loading = false;
      this.router.navigate(['/articles'])
    },
    (error) => {
      this.loading = false;
      this.error = error;
    }
    )
  }

}
