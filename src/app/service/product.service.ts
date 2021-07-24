import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { Filter } from './../models/dto/filter';
import { WebResponse } from '../models/web-response';
import { getHost } from './../contants/rest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private ajax:AjaxService) { }

  loadItems = (filter:Filter) :Promise<WebResponse> => {
    const url = getHost()+"api/public/products";
    return this.ajax.commonAuthorizedAjax(url, {
      filter:filter
    });
  }
}
