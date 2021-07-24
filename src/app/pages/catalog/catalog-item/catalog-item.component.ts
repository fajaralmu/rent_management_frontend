import { Component, Input, OnInit } from '@angular/core';
import { Product } from './../../../models/product';
import { UserService } from './../../../service/user.service';
import { doItLater } from './../../../utils/events';

@Component({
  selector: 'div[app-catalog-item]',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {

  @Input()
  product:Product | undefined;
  mouseover:boolean = false;
  transition:boolean = false;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  get productName() {
    if (this.mouseover) {
      return this.product?.name;
    }
    return this.product?.name.substring(0, 16);
  }  

  get bgUrl()  {
    if (!this.product || this.product.pictures.length == 0) return "/assets/images/index.png";

    return this.userService.assetPath+"images/"+this.product.pictures[0].name;
  }

  setMouseOver = (mouseover:boolean) => {
    this.transition = true;
    doItLater(()=>{
      if (this.transition) {
        this.mouseover=mouseover;
      }
      this.transition = false;
    }, 300);
  }
}

