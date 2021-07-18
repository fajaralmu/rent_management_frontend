import { FieldType } from "../constants/field-type"

export interface EntityElement {
    editable: boolean;
    id: string; 
    labelName: string;
    optionItemName: string;
    entityReferenceClass: string;
    identity: boolean;
    required: boolean;
    hasJoinColumn: boolean;
    filterable: boolean;
    orderable: boolean;
    fieldType: string;
    fieldTypeConstants: FieldType;
}
