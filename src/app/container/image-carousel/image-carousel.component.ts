import { Component, Input, OnInit } from '@angular/core';
import { Picture } from './../../models/picture';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'div[app-image-carousel]',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  @Input()
  pictures:Picture[] = [];
  activeIndex:number = 0;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  get imageAssetPath() {
    return this.userService.assetPath+"images/";
  }

  get picJson() {
    return JSON.stringify(this.pictures);
  }

  next =() => {
    this.activeIndex++;
    this.validateIndex();
  }

  previous = () => {
    this.activeIndex--;
    this.validateIndex();
  }

  validateIndex = () => {
    if (this.activeIndex > this.pictures.length - 1) {
      this.activeIndex = 0;
    }
    if (this.activeIndex < 0) {
      this.activeIndex = this.pictures.length - 1;
    }
  }

}
