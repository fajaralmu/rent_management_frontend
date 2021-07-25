import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Product } from './../../../models/product';
import { UserService } from './../../../service/user.service';
import { doItLater } from './../../../utils/events';

@Component({
  selector: 'div[app-catalog-item]',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit, AfterViewInit {

  @Input()
  product:Product | undefined;
  mouseover:boolean = false;
  transition:boolean = false;
 
  @Output()
  showDetail:EventEmitter<Product> = new EventEmitter();

  constructor(private userService:UserService) { }
  ngAfterViewInit(): void {
   
  }
   
  showDetailProduct = (p:Product) => {
    this.showDetail.emit(p);
  }
  ngOnInit(): void {
  }

  get productName() {
    if (this.mouseover) {
      return this.product?.name;
    }
    return this.product?.name.substring(0, 16);
  }  

  get bgUrl():string | undefined  {
    if (!this.product || this.product.pictures.length == 0) return undefined;

    return this.userService.assetPath+"images/"+this.product.pictures[0].name;
  }

  /**
   * mouseover true
   */
  setMouseOver = ( ) => {
    this.transition = true;
    doItLater(()=>{
      if (this.transition) {
        this.mouseover= true;
      }
      this.transition = false;
    }, 150);
  }

  /**
   * mouseover false
   */
  setMouseOut = () => { 
    this.transition=false; 
    this.mouseover=(false)
  }
 
}

