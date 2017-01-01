import {Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {User} from "./model/user";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";

declare var $:any;
/*
let foundation = require('../../node_modules/foundation-sites/dist/js/foundation.js');
*/



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./merx.css']
})
export class AppComponent implements OnInit ,AfterViewInit{
  @ViewChild('forgotsuccessT') eleme;
  ngAfterViewInit(): void {

/*    $('body').on('click','#signupLogin',function(){
      $('#loginClose').trigger('click');
      $('#LoastPaswordClose').trigger('click');

    });
    $('body').on('click','#LoginPoupOpen',function(){

      console.log("hihello");
    });
    $('body').on('click','#loginLogin',function(){
      $('#SignupClose').trigger('click');
      $('#LoastPaswordClose').trigger('click');
    });
    $('body').on('click','#ForgotPass',function(){
      $('#loginClose').trigger('click');
      $('#SignupClose').trigger('click');
    });

    $('body').on('click','#LoginPoupOpen',function(){

    });*/

  }
  ngOnInit(): void {
    this.init();
  }

  userName:string='';
  currentSelectedBranch=0;
  email:string='';
  password:string='';
  newUser:User= new User('','',''); //will create a typescript class for this
  loginError : boolean=false;
  ShowUserName : boolean=false;
  showLogin : boolean=false;
  loginErrorText : string ='';
  forgotError :boolean=false;
  registerError :boolean=false;
  forgotErrorText : string='';
  registerErrorText : string='';
  currentActiveModal:NgbModalRef;
  forgotMsg=true;
  forgotMsgText='';



  constructor (private localStorage:LocalStorageService,private authService:AuthenticationService,private router:Router,private el: ElementRef ,private modalService: NgbModal) {


}
  saveValue() {
    this.localStorage.store('stored', "hello stored");
  }
  forgotPassword (form:NgForm) {
    this.newUser.email=form.value.forgotEmail;
      this.authService.forgetPassword(this.newUser).subscribe(data=> {
      this.email=this.newUser.email;
          this.forgotMsg=true;
          this.forgotMsgText=data.message;
          console.log(data);
          this.showModal(this.eleme);

      },
      error => {
        this.forgotMsg=true;
        this.forgotMsgText='Something went wrong';}
      )
  };
  init(){
    console.log("hello");
     var user:User = this.localStorage.retrieve('user');
     if(user){
     this.ShowUserName=true;
     this.showLogin=false;
     this.userName=user.name;//user.name;
     }else{
     //$state.go('a.dashboard');
     this.ShowUserName=false;
     this.showLogin=true;
     }
  };
  logout () {
    console.log("logout");
    this.localStorage.clear("user");
    this.localStorage.store("authenticated",false);//userootscop for these
    this.localStorage.clear("currentUser");//use rootscope for these
    this.router.navigateByUrl('/dashboard');
  };
  login (form:NgForm) {
       this.email=form.value.email;
       this.password=form.value.password;
       console.log(form);
    var testUser:User=new User(this.email,this.password);

    this.authService.login(testUser).subscribe(data => {

       this.localStorage.store('user', testUser);
        this.localStorage.store("authenticated","true");
        this.localStorage.store("currentUser",testUser);
        this.loginError = false;
        this.loginErrorText = '';
        this.localStorage.store('satellizer_token',data.token);



      },
    error => {
      console.log(error);

      this.loginError = true;
      this.loginErrorText = error.json();
    }
    );
/*
  /!*  var credentials = {
   email: $scope.email,
   password: $scope.password
   }*!/

  $auth.login(credentials).then(function() {
    return $http.get('api/authenticate/user');

  }, function(error) {
    $scope.loginError = true;
    $scope.loginErrorText = error.data.error;

  }).then(function(response) {
    if(response !=undefined || response !=''){
      var username=response.data.user.name;
      $scope.userName=username;
      var user = JSON.stringify(response.data.user);
      var user1=response.data.user;
      var roleId = user1.role_id;

      if(roleId==1){
        localStorage.setItem('user', user);
        $rootScope.authenticated = true;
        $rootScope.currentUser = response.data.user;
        $scope.loginError = false;
        $scope.loginErrorText = '';

        var lastUrl=localStorage.getItem('lasturl');
        if(lastUrl!=''){
          window.location.href=lastUrl;
          localStorage.setItem('lasturl','');
        }else{
          window.location.reload();
        }
        return;
      }
    }
  });*/
}
  loginFromRegister () {
    var testUser:User=new User(this.email,this.password);

    this.authService.login(testUser).subscribe(data => {

       this.localStorage.store('user', testUser);
        this.localStorage.store("authenticated","true");
        this.localStorage.store("currentUser",testUser);
        this.loginError = false;
        this.loginErrorText = '';
        this.localStorage.store('satellizer_token',data.token);




      },
    error => {
      console.log(error);

      this.loginError = true;
      this.loginErrorText = error.json();
    }
    );
/*
  /!*  var credentials = {
   email: $scope.email,
   password: $scope.password
   }*!/

  $auth.login(credentials).then(function() {
    return $http.get('api/authenticate/user');

  }, function(error) {
    $scope.loginError = true;
    $scope.loginErrorText = error.data.error;

  }).then(function(response) {
    if(response !=undefined || response !=''){
      var username=response.data.user.name;
      $scope.userName=username;
      var user = JSON.stringify(response.data.user);
      var user1=response.data.user;
      var roleId = user1.role_id;

      if(roleId==1){
        localStorage.setItem('user', user);
        $rootScope.authenticated = true;
        $rootScope.currentUser = response.data.user;
        $scope.loginError = false;
        $scope.loginErrorText = '';

        var lastUrl=localStorage.getItem('lasturl');
        if(lastUrl!=''){
          window.location.href=lastUrl;
          localStorage.setItem('lasturl','');
        }else{
          window.location.reload();
        }
        return;
      }
    }
  });*/
}
  register(form:NgForm) {
      console.log(form);

    this.authService.register(this.newUser).subscribe(data =>
      {
        /*
         after registering login using same way

         $scope.email=$scope.newUser.email;
         $scope.password=$scope.newUser.password;
         $scope.name=$scope.newUser.name;
         $scope.login();*/
        this.email=this.newUser.email;
        this.password=this.newUser.password;
        this.loginFromRegister();

      },
        error => {

          this.loginError = true;
          this.registerErrorText = error.json();
        }
    );

};
  showLoginModal(content){
    if(this.currentActiveModal)
    {this.currentActiveModal.dismiss()}
   this.currentActiveModal= this.modalService.open(content);
  }
  showSingupModal(content){
    if(this.currentActiveModal)
    {this.currentActiveModal.dismiss()}
    this.currentActiveModal=this.modalService.open(content);
}
  showModal(content){
    if(this.currentActiveModal)
    {this.currentActiveModal.dismiss()}
    this.currentActiveModal=  this.modalService.open(content);
}

}
