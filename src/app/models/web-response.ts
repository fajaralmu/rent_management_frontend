
import { User } from './user';
import { ApplicationProfile } from './application-profile';
import { EntityProperty } from './entity-property';
import { Filter } from './dto/filter';

export interface WebResponse {
    user:User |undefined;
    applicationProfile:ApplicationProfile|undefined;
    code:string;
    message:string;
    requestId:string|undefined;
    generalList:any[]|undefined;
    entityProperty:EntityProperty;
    entities:any[];
    entity:any|undefined;
    totalData:number;
    filter:Filter;
}
