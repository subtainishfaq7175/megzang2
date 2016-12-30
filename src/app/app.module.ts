import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MegzComponent } from './megz/megz.component';
import {routing} from "./app.route";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {Ng2Webstorage} from "ng2-webstorage";

@NgModule({
  declarations: [
    AppComponent,
    MegzComponent,
    DashboardComponent,
    ProductComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2Webstorage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
