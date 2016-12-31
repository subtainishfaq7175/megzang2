import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {LocalStorageService} from "ng2-webstorage";
import {User} from "../model/user";
import   "rxjs/Rx";
import {API_URL} from "../app.config";

@Injectable()
export class AuthenticationService {
  public token:string;

  constructor(private http: Http,private localStorage:LocalStorageService) {  }


  login(userCredentials:User){

    const body= JSON.stringify(userCredentials);
/*    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });*/
    return this.http.post(API_URL+"api/authenticate/",body)
      .map((data:Response)=>data.json());


  }

  logout(){

  }

  register(userCredentials:User){

    const body= JSON.stringify(userCredentials);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(API_URL+"api/register",body,options)
      .map((data:Response)=>data.json());

  }

  forgetPassword(userCredentials:User){

    const body= JSON.stringify(userCredentials);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(API_URL+'/api/forgotpassword',body,options)
      .map((data:Response)=>data.json());

  }

}
