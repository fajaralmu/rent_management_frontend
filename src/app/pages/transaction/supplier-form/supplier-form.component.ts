import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MasterDataService } from './../../../service/master-data.service';
import { Supplier } from './../../../models/supplier';
import { Filter } from './../../../models/dto/filter';
import { WebResponse } from './../../../models/web-response';

@Component({
  selector: 'div[app-supplier-form]',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {

  message:string | undefined;
  name:string = "";
  items:Supplier[] = [];

  @Output()
  selectItem:EventEmitter<Supplier> = new EventEmitter();

  constructor(private masterData:MasterDataService) { }

  ngOnInit(): void {
  }

  select = (item:Supplier) => {
    this.selectItem.emit(item);

    this.items = [];
    this.name = item.name;
  }
  
  search = (ev:Event) => {
    ev.preventDefault();

    const filter= Filter.withFieldsFilter('name', this.name);
    this.masterData.loadItems('supplier', filter)
      .then(this.itemsLoaded)
      .catch(this.itemsNotLoaded);

  }

  itemsLoaded = (response:WebResponse) => {
    this.message = undefined;
    if (0 == response.entities.length) {
      throw new Error("Not found");
    }
    this.items = response.entities;
  }

  itemsNotLoaded = (err:any) => {
    this.message = "Not found";
    this.items = [];
  }

  hideMessage = () => {
    this.message = undefined;
  }

}
