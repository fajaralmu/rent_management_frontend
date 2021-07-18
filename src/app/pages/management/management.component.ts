import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { MasterDataService } from './../../service/master-data.service'; 

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private userService:UserService,
    private masterDataService: MasterDataService) { }

  ngOnInit(): void {
    this.userService.validateLoggedUser(this.loadManagementPages);
  }

  loadManagementPages = () => {
    this.masterDataService.loadManagementPages();
  }
  pages = () => {
    return this.masterDataService.pages;
  }

}
