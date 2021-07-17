import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { WebResponse } from './models/web-response';
import { Router } from '@angular/router';
import { AlertService } from './service/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rent-management'; 
  initialLoading:boolean = false;
  initialLoadingSuccess:boolean|undefined;
  initialLoadingCount:number = 0;
 
  
  headerContent: string = "Welcome";

  constructor(private userService:UserService, private router:Router, public alert:AlertService){

  }
  ngOnInit(): void {
    this.initialLoad();
  }
  initialLoad = ():void => {
    this.initialLoadingSuccess = undefined;
    this.initialLoadingCount = 1;
    this.initialLoading = true;
    this.userService.requestId().subscribe(
      this.initialLoadingOnSuccess,
      this.initialLoadingOnFailed);
  }

  initialLoadingOnSuccess = (response:WebResponse) => {
    this.initialLoading = false;
    this.initialLoadingSuccess = true;
    this.userService.handleInitialLoading(response);
    if (this.userService.profile) {
      this.headerContent = this.userService.profile.name;
    }
     
  }
  initialLoadingOnFailed = (err:any) => {
    this.initialLoadingCount++;
    if (this.initialLoadingCount > 3) {
      this.initialLoadingSuccess = false;
      return;
    }
    this.userService.retryRequestId().subscribe(
      this.initialLoadingOnSuccess,
      this.initialLoadingOnFailed
    )
    console.error(err.error);
  }

  logout = () => {
    this.alert.showConfirm("Logout?")
    .then(ok=> {
      if (!ok) return;
      this.doLogout();
    });
  }

  private doLogout() {
    this.userService.logout().then(success=>{
      if (success) {
        this.userService.validateLoggedUser();
      } else {
        this.alert.showInfo("Error logout");
      }
    });
  }

  loggedUser = () => {
    return this.userService.user;
  }

  /**
   * ALERT ---------------
   */
  

  

  
}
