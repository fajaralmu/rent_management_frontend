import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from './../../../models/product';
import { Filter } from './../../../models/dto/filter';
import { MasterDataService } from './../../../service/master-data.service';
import { WebResponse } from './../../../models/web-response';

@Component({
  selector: 'div[app-product-form]',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  message:string | undefined;
  name:string = "";
  items:Product[] = [];

  @Output()
  selectItem:EventEmitter<Product> = new EventEmitter();

  constructor(private masterData:MasterDataService) { }

  ngOnInit(): void {
  }

  select = (item:Product) => {
    this.selectItem.emit(item);

    this.items = [];
    this.name = "";//item.name;
  }
  
  search = (ev:Event) => {
    ev.preventDefault();

    const filter= Filter.withFieldsFilter('name', this.name);
    this.masterData.loadItems('product', filter)
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
