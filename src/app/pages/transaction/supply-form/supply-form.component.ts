import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Transaction } from './../../../models/transaction';
import { Supplier } from './../../../models/supplier'; 
import { Product } from './../../../models/product';
import { TransactionItem } from './../../../models/transaction-item';
import { AlertService } from './../../../service/alert.service';
import { TransactionService } from './../../../service/transaction.service';
import { WebResponse } from './../../../models/web-response';

@Component({
  selector: 'app-supply-form',
  templateUrl: './supply-form.component.html',
  styleUrls: ['./supply-form.component.css']
})
export class SupplyFormComponent implements OnInit {

  transaction:Transaction = new Transaction();
  constructor(private alert:AlertService, private userService:UserService, private service:TransactionService) { }

  ngOnInit(): void {
    this.userService.validateLoggedUser();
  }

  setSupplier = (supplier:Supplier) =>  {
    this.transaction.supplier = supplier;
  }

  addProduct = (product:Product) => {
    const item:TransactionItem = new TransactionItem(product);
    this.transaction.addItem(item);
  }

  inputIsValid = ():boolean => {
    return this.transaction .supplier !== undefined && this.transaction.items.length > 0;
  }
  resetItems = () => {
    this.alert.showConfirm("Reset items?")
    .then(ok=>{
      if (ok) {
        this.transaction.items = [];
      }
    })
  }
  removeItem = (index:number) => {
    this.transaction.removeItem(index);
  }
  submit = (event:Event) =>  {
    event.preventDefault();
    console.debug("transaction: ", this.transaction);
    this.alert.showConfirm("Submit?")
    .then((ok)=> {
      if (ok) {
        this.service.submitAddStock(this.transaction)
          .then(this.transactionSuccess).catch((err?)=>{
            this.alert.showInfo("Transaction failed").then(null);
          })
      }
    })
  }

  transactionSuccess = (response:WebResponse) => {
    this.alert.showInfo("Transaction success").then(()=>{
      this.transaction = new Transaction()
    });
  }
}
