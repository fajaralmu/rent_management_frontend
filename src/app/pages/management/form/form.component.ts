import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterDataService } from './../../../service/master-data.service';
import { UserService } from './../../../service/user.service';
import { EntityProperty } from './../../../models/entity-property';

@Component({
  selector: 'div[app-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  entityName:string|null = null;

  get property() :EntityProperty | undefined {
    if (null === this.entityName) return undefined;
    return this.masterDataService.getProperty(this.entityName);
  }

  constructor(private userService:UserService, private route: ActivatedRoute, private masterDataService:MasterDataService) { }

  ngOnInit(): void {
    this.userService.validateLoggedUser(this.loadConfig);
  }
  loadConfig = () => {
    const routeParams = this.route.snapshot.paramMap;
    this. entityName = routeParams.get('entityName');
    if (this.entityName === null) return;
    this.masterDataService.loadConfig(this.entityName)
    .then((result:any)=>{
      
    });
  }

}
