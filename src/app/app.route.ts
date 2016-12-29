import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductComponent} from "./product/product.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
/**
 * Created by subtainishfaq on 12/29/16.
 */

const APP_ROUTES = [
  {path :'dashboard', component:DashboardComponent },
  {path :'product', component:ProductComponent },
  {path :'resetpassword', component:ResetPasswordComponent },
  {path :'', component:AppComponent }
/*
  {path :'dashboard', component:AppComponent },
*/

  ];

  export  const routing= RouterModule.forRoot(APP_ROUTES)
