import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Picture } from './../../../../../models/picture';
import { toPicture } from './../../../../../utils/component-util';
import { UserService } from './../../../../../service/user.service';
 

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent implements OnInit {

  @Input()
  items:Picture[] = [];
  @Output()
  update :EventEmitter<Picture[]> = new EventEmitter();
  
  canvas:HTMLCanvasElement;
  canvasCtx:CanvasRenderingContext2D|null;

  loading:boolean =false;
  constructor(private userService:UserService) { 
    this.canvas = document.createElement('canvas');
    this.canvasCtx = this.canvas.getContext("2d");
  }

  ngOnInit(): void {
  }

  addPicture = (event:Event) => {
    const file = event.target as HTMLInputElement;
    toPicture(file).then(this.addPictureToList) .catch(console.error);
  }
  addPictureToList = (picture:Picture|null) => {
    if (null != picture) {
      this.items.push(picture);
      this.callUpdate();
    }
  }
  callUpdate = () =>{
    this.update.emit(this.items);
  }
  remove = (index:number) => {
    this.items.splice(index,1);
    this.callUpdate();
  }
  trimName = (name:string) => {
    const maxLength = 6;
    if (name.length <= maxLength) {
      return name + (" ").repeat(maxLength - name.length);
    }
    return name.substr(0, maxLength)+"...";
  }

  imageSrc = (picture:Picture) :string|undefined => {
    if (picture.base64Data) {
      return picture.base64Data;
    }
    return (this.userService.assetPath ??"")+"images/"+ picture.name;
  }

  inputByLink = () => {
    const input:string | null = prompt("Input image link");
    if (null == input) return;
    this.loading = true;
    const image = new Image();
    image.crossOrigin = "anonymous";  
    image.src = input;
    image.onload = () => {
      this.addPictureFromImage(image);
      this.loading = false;
    }
    image.onerror=()=>{
      this.loading = false;
    }
  }
  addPictureFromImage = (image:any) => {
    if (!this.canvasCtx) return;

    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.canvasCtx.drawImage(image, 0, 0);
    let p:Picture = new Picture();
    p.base64Data = this.canvas.toDataURL("image/png");
    p.name = "Image "+this.items.length;
    this.addPictureToList(p);
  }
}
