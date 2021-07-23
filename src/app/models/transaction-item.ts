
import { Product } from './product';
export class TransactionItem {
    product:Product;
    count:number = 0;
    price:number = 0;

    constructor(p:Product) {
        this.product = p;
    }
}
