import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
 

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, AfterViewInit {
  @Input() message: string = 'Alert !';
  @Input() confirmAlert: boolean=false;
  @Output() yesClicked: EventEmitter<any>  = new EventEmitter ();
  @Output() noClicked: EventEmitter<any>  = new EventEmitter ();

  @ViewChild('yesButton') yesButton: ElementRef<HTMLElement>|undefined;

  constructor() { }
  
  ngAfterViewInit(): void {
    if (this.yesButton) {
      this.yesButton.nativeElement.focus();
    }
  }

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
