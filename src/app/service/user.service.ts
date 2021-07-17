import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { commonHeaders, getHost, setRequestId } from '../contants/rest';
import { User } from './../models/user';
import { WebResponse } from './../models/web-response';
import { ApplicationProfile } from './../models/application-profile';
import { setLoginKeyCookie } from './../contants/rest';
import { Router } from '@angular/router'; 

const FORM_URL_ENCODED:string = 'application/x-www-form-urlencoded';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private loggedUser:User|undefined;
  private applicationProfile:ApplicationProfile|undefined;

  get user() {
    return this.loggedUser;
  }
  get profile() {
    return this.applicationProfile;
  }

  constructor(private http:HttpClient, private router:Router) { }


 /**
  * 
  * @param username 
  * @param password 
  */
  public login(username:string, password:string): Promise<boolean> {
    const formData:Record<string, string> = {
      username:username,
      password:password,
      transport_type:'rest'
    }
    const queryString = new URLSearchParams(formData ).toString();

    return new Promise<boolean>((res, rej)=> {
      const url = getHost()+"login?"+queryString;

      this.http.post<WebResponse >(url,{},{observe: 'response', ...this.loginHeader})
      
      .subscribe((resp:HttpResponse<WebResponse>)=>{
        this.handleSuccessLogin(resp);
        res(true);
      }, (err) => {
        res(false);
      })
    });
  
  }

  private handleSuccessLogin = (resp:HttpResponse<WebResponse>) => {
    this.loggedUser = resp.body?.user;
    setLoginKeyCookie(resp.headers.get("access-token"));
  }

  private get loginHeader() {
    return {
      headers:{
        'Content-Type': FORM_URL_ENCODED
      }
    }
  }

  /**
   * validateLoggedUser
   */
  public validateLoggedUser = ():boolean => {
    if (!this.loggedUser) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
  /**
   * requestId
   */
  public requestId() : Observable<WebResponse> {
    return this.http.post<WebResponse>(getHost()+"api/public/requestid", {},
     commonHeaders(true));
  }
  /**
   * retryRequestId
   */
  public retryRequestId() : Observable<WebResponse> {
    setLoginKeyCookie("");
    return this.http.post<WebResponse>(getHost()+"api/public/requestid", {},
     commonHeaders(false));
  }
  
  /**
   * handleInitialLoading
   * @param response 
   */
  handleInitialLoading(response: WebResponse) {
      if (response.user) {
        this.loggedUser = response.user;
      }
      if (response.requestId) {
        setRequestId(response.requestId);
      }
      this.applicationProfile = response.applicationProfile;
  }
}
