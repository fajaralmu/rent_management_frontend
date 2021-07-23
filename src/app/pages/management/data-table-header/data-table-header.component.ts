import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EntityProperty } from './../../../models/entity-property';
import { Filter } from './../../../models/dto/filter';
import { EntityElement } from './../../../models/entity-element';

@Component({
  selector: 'thead[app-data-table-header]',
  templateUrl: './data-table-header.component.html',
  styleUrls: ['./data-table-header.component.css'] 
})
export class DataTableHeaderComponent implements OnInit {

  @Input()
  property:EntityProperty|undefined;
  @Input()
  filter:Filter|undefined;
  @Output()
  updateFilter:EventEmitter<Filter> = new EventEmitter();

  get elements() {
    return this.property?.elements ?? [];
  }

  constructor() { }

  ngOnInit(): void {
  }

  public sortBy = (el:EntityElement) => {
    if (!el.orderable) return;
    const filter:Filter = Object.assign(new Filter(), this.filter);
    
    if ( filter.orderBy != el.id) {
      filter.orderBy = el.id;
      filter.orderType = "asc";
      this.updateFilter.emit(filter);
      return;
    }
    
    filter.orderType = filter.orderType == "asc"?"desc":"asc";
    this.updateFilter.emit(filter);
  }

}
