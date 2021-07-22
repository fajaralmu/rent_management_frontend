import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { commonHeaders } from '../contants/rest';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(private http:HttpClient, private userService:UserService) { }

  /**
   * 
   * @param url 
   * @param body 
   * @param onSuccessCallback after ajax success
   */
  public  commonAuthorizedAjax = <Type>(url:string, body:any, onSuccessCallback?:(t:Type)=>any): Promise<Type > => {
    return new Promise<Type >((res, rej) => {
      this.http.post<Type>(url, body, {
        observe: 'response',
        ... commonHeaders(true)
      }).subscribe((response:HttpResponse<Type>)=>{
        this.userService.updateToken(response);

        if (response.body) {
          res(response.body);

          if (onSuccessCallback) {
            onSuccessCallback(response.body);
          }

        } else {
          throw new Error("Response body cannot be read");

        }
        
      }, (error:HttpErrorResponse) => {
        rej(error.error)

      });
    }) 
    
  }
}
