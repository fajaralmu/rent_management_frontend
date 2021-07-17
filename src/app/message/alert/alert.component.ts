import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string = 'Alert !';
  @Input() confirmAlert: boolean=false;
  @Output() yesClicked: EventEmitter<any>  = new EventEmitter ();
  @Output() noClicked: EventEmitter<any>  = new EventEmitter ();
  constructor() { }

  ngOnInit(): void {
  }
  yesClick(): void {
    if (this.yesClicked)
      this.yesClicked.emit();
  }
  noClick(): void {
    if (this.noClicked) 
      this.noClicked.emit();
  }


}
