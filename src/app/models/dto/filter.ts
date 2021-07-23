export class Filter {
    limit:number = 10;
    page:number = 0;
    fieldsFilter:Record<string, any> = {};
    orderBy:string = "id";
    orderType:string = "asc";
    
    public static withFieldsFilter = (key:string, val:any): Filter => {
        const filter= new Filter();
        filter.fieldsFilter[key] = val;

        return filter;
    }
}
