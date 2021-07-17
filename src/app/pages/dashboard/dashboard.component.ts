import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }
  
  public get user() :User|undefined {
    return this.userService.user;
  }

  ngOnInit(): void {
    this.userService.validateLoggedUser();
  }

}
