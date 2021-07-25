import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from './../../../models/product';
import { doItLater } from './../../../utils/events';
import { UserService } from './../../../service/user.service';
import { Picture } from './../../../models/picture';

@Component({
  selector: 'div[app-catalog-detail]',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.css']
})
export class CatalogDetailComponent implements OnInit {

  @Input()
  product:Product | undefined;
  @Output()
  back:EventEmitter<any> = new EventEmitter();

  constructor(private userService:UserService) { }

  ngOnInit(): void {  }
 

  hideDetail = () => {
    this.back.emit();
  }
 
}
