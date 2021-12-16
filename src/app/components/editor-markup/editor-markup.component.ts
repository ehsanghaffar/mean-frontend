import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare const MediumEditor: any;


@Component({
  selector: 'app-editor-markup',
  templateUrl: './editor-markup.component.html',
  styleUrls: ['./editor-markup.component.sass']
})
export class EditorMarkupComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
