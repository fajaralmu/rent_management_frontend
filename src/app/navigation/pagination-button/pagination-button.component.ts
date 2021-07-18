import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.css']
})
export class PaginationButtonComponent implements OnInit {

  @Input() limit:any;
  @Input() totalData:any;
  @Input() currentPage:any;

  @Output() goToPage: EventEmitter<number>  = new EventEmitter ();
  constructor() { }

  ngOnInit(): void {
  }
  prevPage(): void {
    const buttonIndexes = this.buttonIndexes();
    const lastIndex = buttonIndexes[buttonIndexes.length - 1];
    const previusPage = this.currentPage - 1 < 0? lastIndex-1 : this.currentPage - 1;
    this.navigate(previusPage);
  }
  nextPage(): void {
    const buttonIndexes = this.buttonIndexes();
    const lastIndex = buttonIndexes[buttonIndexes.length - 1];
    const nextPage = this.currentPage + 1 >= lastIndex  ? 0 : this.currentPage + 1;
    this.navigate(nextPage);
  }
  navigate(page:number): void {
    
    this.goToPage.emit(page);
  }
  buttonIndexes() {
    
    let indexes = generateButtonValues(this.limit, this.totalData, this.currentPage);
    
    return indexes;
  }

}

const generateButtonValues = (limit: number, totalData: number, currentPage: number) => {

  /* DISPLAYED BUTTONS */
  const displayed_buttons: number[] = [];
  const buttonCount = Math.ceil(totalData / limit);

  // console.debug("current page:", currentPage);
  const min = (currentPage) - 1;
  const max = (currentPage) + 3;
  // const min = (currentPage) - 2;
  // const max = (currentPage) + 2;

  // console.debug("min", min, "current page:", currentPage, "max", max);
  if (buttonCount > 1) {
      displayed_buttons.push(1);
  }
  for (let i = min; i <= max; i++) {
      if (i > 1 && i <= buttonCount) {
          (displayed_buttons.push(i));
      }
  }
  if (max < buttonCount) {
      displayed_buttons.push(buttonCount);
  }
  return displayed_buttons;
}
