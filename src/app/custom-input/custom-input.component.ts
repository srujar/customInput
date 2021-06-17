import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation, RendererStyleFlags2 } from '@angular/core';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CustomInputComponent implements OnInit {

  searchValues = [];
  search = false;
  val = ''
  caretPosition: any = { x: 0, y: 0 };
  teamInitial: string;
  initialSearchValues = ['Gina Williams', 'Jake Williams', 'Jamie John', 'John Doe', 'Jeff Stewart', 'Paula M. Keith'];

  textValue = 'Type in the text here....';
  @ViewChild('textArea', { static: false }) textArea: any;
  @ViewChild('mySelect', { static: false }) mySelect: any;
  constructor(
    private renderer: Renderer2,
    private _elementRef: ElementRef
  ) { }

  ngOnInit(): void { }

  valueChanges(event) {
    if (this.search) {
      if (!this.val.length && event.data == null && event.inputType == "deleteContentBackward") {
        this.closeSelect();
        this.search = false;
        return true;
      }
      if (event.data) {
        this.val += event.data;
      } else {
        this.val = this.val.slice(0, -1);
      }
      this.searchValues = this.filterData();
    }

    if (event.inputType == 'insertText' && event.data == '@') {
      this.searchValues = this.initialSearchValues;
      this.search = true;
      this.openSelect();
    }

    this.caretPosition = this.getCaretCoordinates();


    // this.renderer.setStyle(this.mySelect.nativeElement.querySelector('.mat-select'), "left", "350px!important");
    // const box = this._elementRef.nativeElement.querySelector('.box');
    // console.log("this.mySelect", this.mySelect)
    // this.renderer.setStyle(box, "left", "350px",RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    // this.renderer.setAttribute(this.mySelect.nativeElement, 'panelClass')


    // console.log("event.data", event.data);
    // console.log("this.val", this.val);
    // console.log("event", event);
    // console.log("this.search", this.search);
    // console.log("event.target.textContent", event.target.textContent);
    // console.log("this.searchValues", this.searchValues);

  }

  onClick() {
    if (this.search) {
      this.openSelect();
    }
  }

  openSelect() {
    setTimeout(() => {
      this.mySelect.open();
    }, 100);
  }

  closeSelect() {
    setTimeout(() => {
      this.mySelect.close();
    }, 100);
  }

  filterData() {
    return this.initialSearchValues.filter(word => word.toLocaleLowerCase().includes(this.val.toLocaleLowerCase()));
  }

  selectName(item) {
    let spliValue = JSON.parse(JSON.stringify(this.textArea.nativeElement.innerText.split("@")));
    this.textArea.nativeElement.textContent = spliValue[0] + item;
    this.searchValues = [];
    this.val = '';
    this.search = false;
    this.mySelect.close();
    this.teamInitial = '';
  }


  onKeypressEvent(event: any) {
    this.mySelect.focus();
    this.mySelect.open();
  }

  getCaretCoordinates() {
    let x = 0,
      y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
    }
    return { x, y };
  }
}
