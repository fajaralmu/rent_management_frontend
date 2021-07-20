import { Component, Input, OnInit } from '@angular/core';
import { EntityProperty } from './../../../models/entity-property';
import { Filter } from './../../../models/dto/filter';
import { Router } from '@angular/router';
import { MasterDataService } from './../../../service/master-data.service';
import { AlertService } from './../../../service/alert.service';

@Component({
  selector: 'tbody[app-data-table-content]',
  templateUrl: './data-table-content.component.html',
  styleUrls: ['./data-table-content.component.css']
})
export class DataTableContentComponent implements OnInit {

  @Input()
  items:any[] = [];
  @Input()
  property:EntityProperty | undefined;
  @Input()
  filter:Filter | undefined;

  constructor(private alert:AlertService, private router:Router, private masterDataService:MasterDataService) { }

  ngOnInit(): void {
  }

  /**
   * recordNumber
   * @param index
   */
  public recordNumber = (index:number): number => {
    if (!this.filter) return 0;
    return this.filter.limit * this.filter.page + index + 1;
  }

  public edit = (id:any) => {
    if (!this.property) return;
    
    this.router.navigate(['/management/form/'+this.property.entityName], { state: { id: id} });
  }

  public deleteRecord = (id:any) => {
    if (!this.property) return;
    
    this.alert.showConfirm("Delete data?")
    .then(ok=>{
      if (ok) this.doDelete(id);
    })
  }

  private doDelete = (id:any) => {
    if (!this.property) return;
    this.masterDataService.delete(this.property, id)
    .then(res=>{
      this.alert.showInfo("Success").then(()=>this.updateRemovedItem(id));
    })
  }

  private updateRemovedItem = (id:any) => {
    if (!this.property) return;
    const idField:string = this.property.idField;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item[idField] === id) {
        this.items.splice(i, 1);
        break;
      }
      
    }
  }

}