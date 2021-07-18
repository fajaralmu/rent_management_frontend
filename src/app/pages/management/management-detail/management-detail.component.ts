import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterDataService } from './../../../service/master-data.service';
import { EntityProperty } from './../../../models/entity-property';
import { UserService } from './../../../service/user.service';
import { Filter } from './../../../models/dto/filter';
import { WebResponse } from './../../../models/web-response';

@Component({
  selector: 'app-management-detail',
  templateUrl: './management-detail.component.html',
  styleUrls: ['./management-detail.component.css']
})
export class ManagementDetailComponent implements OnInit {

  entityName:string | null = null;
  filter:Filter = new Filter();
  items:any[] | undefined;
  totalData:number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService,
     private masterDataService:MasterDataService) {  

     }

  get property() :EntityProperty | undefined {
    if (null === this.entityName) return undefined;
    return this.masterDataService.getProperty(this.entityName);
  }

  ngOnInit(): void {
    this.userService.validateLoggedUser(this.loadConfig); 
  }

  updateOrder = (filter:Filter) => {
    this.filter.orderBy = filter. orderBy;
    this.filter.orderType = filter. orderType;
    this.loadItems();
  }

  loadConfig = () => {
    const routeParams = this.route.snapshot.paramMap;
    this. entityName = routeParams.get('entityName');
    if (this.entityName === null) return;
    this.masterDataService.loadConfig(this.entityName)
    .then((result:any)=>{
      this.loadItems(0);
    });
  }

  loadItems = (page?:number) => {
    if (!this.entityName) return;
    if (page || page == 0) {
      this.filter.page = page;
    }
    this.masterDataService.loadItems(this.entityName, this.filter)
    .then(this.itemsLoaded);
  }

  private itemsLoaded = (response:WebResponse) => {
    this.items      = response.entities;
    this.filter     = response.filter;
    this.totalData  = response.totalData;
  }
}
