
import { Unit } from './unit';
import { Picture } from './picture';
export interface Product {

    code:string;
    name:string;
    description:string;
    price:number;
    unit:Unit;
    pictures:Picture[];
    count:number;
    forRent:boolean;
}


