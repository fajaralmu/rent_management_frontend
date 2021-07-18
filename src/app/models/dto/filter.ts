export class Filter {
    limit:number = 10;
    page:number = 0;
    fieldsFilter:Record<string, any> = {};
    orderBy:string = "id";
    orderType:string = "asc";
}
