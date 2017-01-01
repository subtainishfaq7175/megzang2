import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  {
  @ViewChild('productVal') eleme;


  constructor(private localStorage:LocalStorageService,private router:Router) { }

  addProduct(){
    console.log(this.eleme);
    this.localStorage.store('TextVal', this.eleme.value);
    this.router.navigateByUrl('/product');
  }



}
