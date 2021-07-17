import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { WebResponse } from './../../models/web-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = "";
  password:string = "";
  loginSuccess:boolean | undefined;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginSuccess = undefined;
    this.userService.login(this.username, this.password)
      .then(this.handleResponse);
  }
  handleResponse = (success:boolean) => {
    if (success) {
      this.loginSuccess = true;
    } else {
      this.loginSuccess = false;
    }
  }

}
