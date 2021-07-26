import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Picture } from './../../models/picture';
import { UserService } from './../../service/user.service'; 

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
    this.incrementIndex(1); 
  }

  previous = () => {  
    this.incrementIndex(-1); 
  }

  loadImage = (p:Picture) => {
    if (this.images[p.name]) return;
    const src= this.imageAssetPath+ p.name;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      this.images[p.name] = image;
    }
  }

  get backgroundImageURLs():string {
    return this.pictures.map((p, i)=> {
      this.loadImage(p);
      return 'url(\''+this.imageAssetPath+ p.name+'\')'
    } ).join(",")
  }

  get backgroundImagePositionX():string {
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

  incrementIndex = (increment:number) => {
    this.activeIndex+=increment;
    if (this.activeIndex > this.pictures.length - 1) {
      this.activeIndex = 0;
    }
    if (this.activeIndex < 0) {
      this.activeIndex = this.pictures.length - 1;
    }
  }

}
