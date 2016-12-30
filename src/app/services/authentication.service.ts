import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {LocalStorageService} from "ng2-webstorage";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {
  public token:string;

  constructor(private http: Http,private localStorage:LocalStorageService) {
    // set token if saved in local storage
    var currentUser:User = JSON.parse(localStorage.retrieve('user'));
    this.token =  currentUser.token;
  }


  login(username: string, password: string){


    /* return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        var newUser:User = response.json() && response.json().token;
        if (token) {
          this.token = token;

          this.localStorage.store('user', JSON.stringify({ username: username, token: token }));

          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });*/
  }

}
