import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../service/product.service';
import { Filter } from './../../models/dto/filter';
import { WebResponse } from './../../models/web-response';
import { Product } from './../../models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  filter:Filter = new Filter();
  items:Product[] = [];
  totalData:number = 0;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.loadItems(0);
  }

  loadItems = (page?:number) => {
    if (page || page == 0) {
      this.filter.page = page;
    }
    this.filter.orderBy="name";
    this.productService.loadItems(this.filter)
    .then(this.itemsLoaded)
  }

  itemsLoaded = (response:WebResponse) => {
    this.items      = response.entities;
    this.totalData  = response.totalData;
    this.filter     = response.filter;
  }
}