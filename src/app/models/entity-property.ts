
import { EntityElement } from './entity-element';

export interface EntityProperty {
    entityName  :string;
    alias       :string;
    idField     :string;
    elements    :EntityElement[];
    fieldNameList:string[];
}
