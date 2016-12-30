import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {User} from "./model/user";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./merx.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.init();
    this.saveValue();
    this.login();
  }

  userName:string='';
  currentSelectedBranch=0;
  email:string='';
  password:string='';
  newUser:User; //will create a typescript class for this
  loginError : boolean=false;
  ShowUserName : boolean=false;
  showLogin : boolean=false;
  loginErrorText : string ='';
  forgotError :boolean=false;
  forgotErrorText : string='';



constructor (private localStorage:LocalStorageService,private authService:AuthenticationService,private router:Router)
{


}

  saveValue() {
    this.localStorage.store('stored', "hello stored");
  }
/*
  $scope.newUser.email=$state.params.email;
  $scope.newUser.token=$state.params.token;*/





  forgotPassword () {
 /* $http.post('/api/forgotpassword',$scope.newUser)
    .success(function(data){
      if(data.message){
        $scope.email=$scope.newUser.email;
        $scope.forgotMsg=true;
        $scope.forgotMsgText='';
        if(angular.isArray(data.message)){
          for(var i=0;i<data.message.length;i++){
            $scope.forgotMsgText +=data.message+"\n";
          }
        }else{
          $scope.forgotMsgText =data.message;
        }
        if(data.status=='success'){
          $('#ForgotSuccess').trigger('click');
          setTimeout(function(){
            $('.reveal').foundation('close')
          },3000);

        }
      }
    })
    .error(function(data){
      $scope.forgotMsg=true;
      $scope.forgotMsgText='Something went wrong';
    })*/
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
  login () {

    var testUser:User=new User(this.email,this.password);

    this.authService.login(testUser).subscribe(data => {

       this.localStorage.store('user', testUser);
        this.localStorage.store("authenticated","true");
        this.localStorage.store("currentUser",testUser);
        this.loginError = false;
        this.loginErrorText = '';


      },
    error => {

/*
      setup error , test error
      this.loginError = true;
      this.loginErrorText = error.json();*/
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
  register() {


    this.authService.register(this.newUser).subscribe(data =>
      {
        $scope.email=this.newUser.email;
        $scope.password=this.newUser.password;
        $scope.name=$scope.newUser.name;
        $scope.login();
      },
        error => {

        /*  this.loginError = true;
          this.registerErrorText = data.message;*/
        }
    );

};

  showLoginModal(){
    console.log("login button on toolbar");
  }

  showSingupModal(){
    console.log("singup button on toolbar");
  }

}
