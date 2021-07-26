import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Picture } from './../../models/picture';
import { UserService } from './../../service/user.service';
import { doItLater } from './../../utils/events';

@Component({
  selector: 'div[app-image-carousel]',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  @Input()
  pictures:Picture[]      = [];
  images:Record<string, any>  = {};
  activeIndex:number      = 0; 

  @ViewChild("carouselItem")
  carouselItem:ElementRef<HTMLDivElement> | undefined;
 
  constructor(private userService:UserService) { }

  ngOnInit(): void {  }

  get carouselItemWidth():number{

    if (this.carouselItem && this.carouselItem.nativeElement){
      return this.carouselItem.nativeElement.getBoundingClientRect().width;
    }
    return 0;
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

  loadImage = (p:Picture, i:number) => {
    if (this.images[p.name]) return;
    const src= this.imageAssetPath+ p.name;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      this.images[p.name] = image;
    }
  }

  get bgUrls():string {
    return this.pictures.map((p, i)=> {
      this.loadImage(p, i);
      return 'url(\''+this.imageAssetPath+ p.name+'\')'
    } ).join(",")
  }

  get bgXPositions():string {
    return this.pictures.map((p, i)=> this.getBackgroundXPos(p, i)).join(",")
  }

  getBackgroundXPos = (p:Picture, index:number) => {
    if (index == this.activeIndex)
      return '0px';
    const casouselW = this.carouselItemWidth;
    const imageW = this.images[p.name] && this.images[p.name].width ? this.images[p.name].width : undefined;
    const w = imageW > casouselW ? imageW : casouselW; 
    const xpos= index > this.activeIndex?  w+'px':  (-w) + 'px'; 
    return xpos;
  }

  get activePictureURL():string  {
    try {
      return this.imageAssetPath + this.pictures[this.activeIndex].name;
    } catch(e) {
      return "";
    }
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
