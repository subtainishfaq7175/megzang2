import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {LocalStorageService} from "ng2-webstorage";
import {User} from "../model/user";
import {API_URL} from "../app.config";

@Injectable()
export class ApiclientService {
  public token:string;

  constructor(private http: Http,private localStorage:LocalStorageService) {
    // set token if saved in local storage

  }


  saveProduct()
    {

    }
  getHtml(textValue:string)
    {
      const body= JSON.stringify({url : textValue});
      let headers = new Headers(
        { 'Content-Type': 'application/json',
          'Authorization': 'bearer '+this.localStorage.retrieve("satellizer_token"),
          'X-Alt-Referer':textValue
        });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(API_URL+'api/Select/getHtml',body,options)
        .map((data:Response)=>data.json());

    }
  }
