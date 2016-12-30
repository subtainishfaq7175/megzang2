import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {LocalStorageService} from "ng2-webstorage";
import {User} from "../model/user";

@Injectable()
export class ApiclientService {
  public token:string;

  constructor(private http: Http,private localStorage:LocalStorageService) {
    // set token if saved in local storage

  }


  saveProduct()
    {
      //this.http.
    }
  getHtml(username: string, password: string)
    {
      //this.http.
    }
  }
