import { Component, Input, OnInit } from '@angular/core';
import { EntityProperty } from './../../../models/entity-property';
import { Filter } from './../../../models/dto/filter';

@Component({
  selector: 'tbody[app-data-table-content]',
  templateUrl: './data-table-content.component.html',
  styleUrls: ['./data-table-content.component.css']
})
export class DataTableContentComponent implements OnInit {

  @Input()
  items:any[] = [];
  @Input()
  property:EntityProperty | undefined;
  @Input()
  filter:Filter | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * recordNumber
   * @param index
   */
  public recordNumber = (index:number): number => {
    if (!this.filter) return 0;
    return this.filter.limit * this.filter.page + index + 1;
  }

}
