import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private ajax:AjaxService) { }
}
