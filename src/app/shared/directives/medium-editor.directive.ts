import 'rxjs/add/operator/debounceTime'; 
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeUntil';
import {Subject} from "rxjs";
import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
// import * as MediumEditor from 'medium-editor';
declare const MediumEditor: any;

/**
 * Medium Editor wrapper directive.
 *
 * Examples
 * <medium-editor
      [(editorModel)]="textVar"
 *    [editorOptions]="{'toolbar': {'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3']}}"
 *    [editorPlaceholder]="placeholderVar"></medium-editor>
 */
@Directive({
  selector: 'medium-editor'
})
export class MediumEditorDirective implements OnInit, OnChanges, OnDestroy {

  private lastViewModel: string;
  private element: HTMLElement;
  private editor: any;
  private active: boolean;
  private inputEdited: EventEmitter<string> = new EventEmitter<string>();
  private componentDestroyed$: Subject<boolean> = new Subject();
  
	@Input('editorModel') model: any;
  @Input('editorOptions') options: any;
  @Input('editorPlaceholder') placeholder: string;
  @Input('debounce') debounce: number;

  @Output('editorModelChange') update = new EventEmitter();
  @Output('focus') focus = new EventEmitter();
  @Output('blur') blur = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.element = this.el.nativeElement;
    this.element.innerHTML = '<div class="me-editable">' + (this.model == undefined ? '': this.model) + '</div>';
    this.active = true;
    

    if (this.placeholder && this.placeholder.length) {
      this.options.placeholder = {
        text : this.placeholder
      };
    }

    // Global MediumEditor
    this.editor = new MediumEditor('.me-editable', this.options);
    this.editor.subscribe('editableInput', (event, editable) => {
      let value = this.editor.getContent();
      value = value.replace(/&nbsp;/g, '').trim();
      if(this.debounce != undefined){
        this.inputEdited.emit(value);
      }
      else{
        this.updateModel(value);
      }
    });
    this.editor.subscribe('focus',()=>{
      this.focus.emit();
    })
    this.editor.subscribe('blur',()=>{
      this.blur.emit();
      if(this.debounce == undefined){return;}
      let value = this.editor.getContent();
      value = value.replace(/&nbsp;/g, '').trim();
      this.updateModel(value);
    })

    if(this.debounce != undefined){
      this.inputEdited
        .takeUntil(this.componentDestroyed$)
        .distinctUntilChanged()
        .debounceTime(this.debounce)
        .subscribe(x=> this.updateModel(x));
    }
  }

  refreshView() {
    if (this.editor) {
      this.editor.setContent(this.model);
    }
  }

  ngOnChanges(): void {
  }

  /**
   * Emit updated model
   */
  updateModel(value:string): void {
    this.lastViewModel = value;
    this.update.emit(value);
  }

  /**
   * Remove MediumEditor on destruction of directive
   */
  ngOnDestroy(): void {
    this.editor.destroy();
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  keyEvents=[];
  editorOptions = {  targetBlank: true,
                      autoLink: true,
                      toolbar: {
                          buttons: ['bold', 'italic', 'underline', 'anchor', 'unorderedlist', 'h3', 'quote'],
                      }
                  }


  keyDown=($event)=>{
    this.keyEvents.push($event.keyCode);
  }

  onFocus = () =>{
    this.keyEvents.push('focus');
  }

  onBlur = () =>{
    this.keyEvents.push('blur');
  }
}