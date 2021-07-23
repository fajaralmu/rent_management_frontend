
import { Supplier } from './supplier';
import { TransactionItem } from './transaction-item';
export class Transaction {
    transactionDate:Date = new Date();
    supplier:Supplier|undefined;
    items:TransactionItem[] = [];
    description:string|undefined;

    addItem = (item:TransactionItem) => {
        this.items.push(item);
    }

    removeItem =(index:number) => {
        for (let i = 0; i < this.items.length; i++) {
            if (i == index) {
                this.items.splice(i, 1);
                break;
            }
            
        }
    }
}
