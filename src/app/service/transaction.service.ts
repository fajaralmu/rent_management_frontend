import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { Transaction } from './../models/transaction';
import { getHost } from './../contants/rest';
import { WebResponse } from './../models/web-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private ajax:AjaxService) { }

  submitAddStock = (transaction:Transaction) :Promise<WebResponse>=> {
    const url = getHost()+"api/app/transaction/addstock";
    return this.ajax.commonAuthorizedAjax<WebResponse>(url, {
      transaction: transaction
    });
  }
}
