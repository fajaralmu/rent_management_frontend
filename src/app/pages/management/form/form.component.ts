import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataService } from './../../../service/master-data.service';
import { UserService } from './../../../service/user.service';
import { EntityProperty } from './../../../models/entity-property';
import { AlertService } from './../../../service/alert.service';
import { WebResponse } from './../../../models/web-response';
import { EntityElement } from './../../../models/entity-element';
import { getInputReadableDate } from './../../../utils/date-util';
import { Picture } from './../../../models/picture';

@Component({
  selector: 'div[app-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  entityName:string|null = null;
  model:Record<string, any> = {};
  modelId:any|undefined;

  get property() :EntityProperty | undefined {
    if (null === this.entityName) return undefined;
    return this.masterDataService.getProperty(this.entityName);
  }

  constructor(private alert:AlertService,
     private userService:UserService, private router:Router, private route: ActivatedRoute, private masterDataService:MasterDataService) { 
      this.modelId = (this.router.getCurrentNavigation()?.extras?.state?.id); 
     }

  
  ngOnInit(): void {
    this.userService.validateLoggedUser(this.loadConfig);
  }
  loadConfig = () => {
    
    const routeParams = this.route.snapshot.paramMap;
    this. entityName = routeParams.get('entityName');
    if (this.entityName === null) return;
    this.masterDataService.loadConfig(this.entityName).then(this.handleGetProperty);
  }

  private handleGetProperty = (prop:EntityProperty) => {
    if (prop.creatable !== true && !this.modelId) {
      this.router.navigateByUrl("/management/"+prop.entityName);
      return;
    }
    if (this.isNewRecord() === false) {
      this.loadRecord();
    } else {
      this.populateModel(prop);
    }
  }

  private loadRecord = () => {
    const prop = this.property;
    if (!prop || !this.modelId) return;
    this.masterDataService.loadSingleRecord(prop, this.modelId)
    .then((response:WebResponse)=>{
      if (!response.entity) {
        this.alert.showInfo("Data not found")
          .then(()=>this.populateModel(prop));
        return;
      }
      this.populateModel(prop, response.entity);
    })
  }

  private populateModel = (property:EntityProperty, existingModel?:any) => {
    if (existingModel ) {
      this.model = existingModel;
      // return;
    } else {
      this.model = {};
    }
    for (let i = 0; i < property.elements.length; i++) {
      const element:EntityElement = property.elements[i];
      if (element.identity === true) {
        if (this.modelId !== undefined) {
          this.model[element.id] = this.modelId;
        }
        continue;
      }
      
      if (this.isFixedList(element) &&element.options && (!this.model[element.id] || !existingModel)) {
        this.model[element.id] = element.options[0];

      } else  if (element.fieldType === 'FIELD_TYPE_IMAGE' && (!this.model[element.id] || !existingModel)) {
        this.model[element.id] = [];

      } else if(element.fieldType === 'FIELD_TYPE_CHECKBOX' && !existingModel){
        this.model[element.id] = false;
      
      } else if(element.fieldType === 'FIELD_TYPE_DATE'){
        this.model[element.id] = getInputReadableDate(new Date(this.model[element.id]));

      } else if(element.fieldType === 'FIELD_TYPE_PLAIN_LIST' && !existingModel){
        this.model[element.id] = element.plainListValues?element.plainListValues[0]:undefined;

      } else if (!existingModel) {
        this.model[element.id] = null;
      }
    }
  }

  updatePicture = (el:EntityElement, pictures:Picture[]) => {
    this.model[el.id] = pictures;
  }

  submit = (ev:Event) => {
    ev.preventDefault();
    this.alert.showConfirm("Save Data?")
    .then(ok=>{
      if (ok) {
        this.doSubmit();
      }
    })
  }

  private doSubmit = () => {
    if (!this.entityName) return;
    console.debug(this.model);
    // return;
    this.masterDataService.submit(this.model, this.entityName, this.isNewRecord())
    .then(response=> this.alert.showInfo("Success").then(()=>{
      if (this.property)
        this.populateModel(this.property);
    }))
    .catch(err => this.alert.showInfo("Error"));
  }

  /**
   * isJSONListSelected
   */
  public isJSONListSelected = (el:EntityElement, option:any) => {
    return this.model[el.id] && option[el.optionValueName] == this.model[el.id][el.optionValueName];
  }

  private isNewRecord = () => {
    return this.modelId === undefined;
  }
 

  /**
   * isFixedList
    */
  public isFixedList = (el:EntityElement): boolean|undefined => {
    
    const result = el.options && el.options.length > 0 && el.fieldType == 'FIELD_TYPE_FIXED_LIST';
    // if (result === true && el.options) {
    //   console.debug("MODEL  ", el.id, this.model[el.id]);
       
    // }
    return result;
  }

  /**
   * hasValue
   */
  public hasValue = (el:EntityElement) => {
    return this.model[el.id] !== undefined;
  }


  /**
   * updateField
   */
  public updateField = (el:EntityElement, option:any) => {
    this.model[el.id] = option;
  }

}
