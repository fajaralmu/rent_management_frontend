import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title:string = "Welcome";
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.title = this.userService.profile?.name ?? "Welcome";
  }

}
