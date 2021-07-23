import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../service/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    
  }

}
