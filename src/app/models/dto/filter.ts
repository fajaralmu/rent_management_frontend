export class Filter {
    limit:number = 10;
    page:number = 0;
    fieldsFilter:Map<string, any> = new Map();
    orderBy:string = "id";
    orderType:string = "asc";
}
