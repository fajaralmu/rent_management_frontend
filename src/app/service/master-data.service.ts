import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { commonHeaders, getHost } from './../contants/rest';
import { ManagementPage as ManagementPage } from './../models/management-props';
import { WebResponse } from './../models/web-response';
import { EntityProperty } from './../models/entity-property';
import { Filter } from '../models/dto/filter';
import { UserService } from './user.service';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  
  
  private managementPages:ManagementPage[] | undefined;
  private configMap:Map<string, EntityProperty> = new Map();

  public get pages() {
    return this.managementPages;
  }
  constructor(private ajax:AjaxService,  private http:HttpClient) { }

  /**
   * loadManagementPages
   */
  public loadManagementPages = (): Promise<WebResponse|null> => {
    const url = getHost()+"api/app/entity/managementpages";
    return this.ajax.commonAuthorizedAjax<WebResponse>(url, {}, this.postLoadManagementPage);
     
  }

  private postLoadManagementPage = (response:WebResponse) => {
    this.managementPages = response.generalList;
  }

  /**
   * loadItems
   */
  public loadItems = (entityName: string, filter: Filter): Promise<WebResponse> => {
    const url = getHost()+"api/app/entity/get";
    return this.ajax.commonAuthorizedAjax<WebResponse>(url, {
      entity  :entityName,
      filter  :filter
    }); 
  }

  /**
   * 
   * getProperty
   * 
   * @param entityName
   */
  public getProperty = (entityName:string) :EntityProperty | undefined => {
    return this.configMap.get(entityName);
  }

  /**
   * loadConfig
   */
  public loadConfig = (entityName: string): Promise<EntityProperty  > => {
    const existingProperty = this.getProperty(entityName);
    if (existingProperty !== undefined) {
      return new Promise<EntityProperty>((resolve, rej) => {
        resolve(existingProperty);
      });
    }
    const url = getHost()+"api/app/entity/configv2";
    return new Promise<EntityProperty>((resolve, reject)=>{
      this.ajax.commonAuthorizedAjax<WebResponse> (url, {entity:entityName}, this.postLoadConfig)
      .then((response:WebResponse)=>{
        resolve(response.entityProperty);
      }).catch(reject);
    }) 
  }

  /**
   * submit
   */
  public submit = (model:any, entityName:string, newRecord:boolean = false) : Promise<WebResponse> => {
    const url = getHost()+"api/app/entity/" + (newRecord?"add":"update");
    return this.ajax.commonAuthorizedAjax<WebResponse> (url, {[entityName]:model, entity:entityName});
  }

  /**
   * loadSingleRecord
   */
  public loadSingleRecord = (entityProperty: EntityProperty, id:any):Promise<WebResponse> => { 
    const url = getHost()+"api/app/entity/getone/"+entityProperty.entityName+"/"+id;
    return this.ajax.commonAuthorizedAjax<WebResponse> (url,  {});
  }

  /**
   * delete
   */
  public delete = (entityProperty: EntityProperty, id:any):Promise<WebResponse> => {
    const url = getHost()+"api/app/entity/delete";
    const filter:Filter = new Filter();
    filter.fieldsFilter[entityProperty.idField]= id;
    return this.ajax.commonAuthorizedAjax<WebResponse> (url, { filter:filter,entity:entityProperty.entityName});
  }

  private postLoadConfig = (response:WebResponse) => {
    const prop = response.entityProperty;
    this.configMap.set(prop.entityName, prop);
  }
}


