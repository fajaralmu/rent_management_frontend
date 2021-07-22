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

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  addPicture = (event:Event) => {
    const file = event.target as HTMLInputElement;
    toPicture(file).then((picture:Picture|null) => {
      if (null != picture) {
        this.items.push(picture);
        this.callUpdate();
      }
    }) .catch(console.error);
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
}
