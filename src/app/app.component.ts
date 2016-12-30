import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./merx.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.init();
    this.saveValue();
  }

  userName:String='';
  currentSelectedBranch=0;
  email:String='';
  password:String='';
  newUser:User; //will create a typescript class for this
  loginError : boolean=false;
  ShowUserName : boolean=false;
  showLogin : boolean=false;
  loginErrorText : String ='';
  forgotError :boolean=false;
  forgotErrorText : String='';


constructor (private localStorage:LocalStorageService)
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
   /* $auth.logout().then(function(data) {
      localStorage.removeItem('user');
      $rootScope.authenticated = false;
      $rootScope.currentUser = null;
      var url=location.href;
      if(url.indexOf('dashboard') > 0){
        window.location.reload();
      }else{
        $state.go('a.dashboard');
      }
    });*/
  };
  login () {
    console.log("login");
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
    console.log("register");
  /*$http.post('/api/register',$scope.newUser)
    .success(function(){
      $scope.email=$scope.newUser.email;
      $scope.password=$scope.newUser.password;
      $scope.name=$scope.newUser.name;
      $scope.login();

    })
    .error(function(data){
      $scope.loginError = true;
      $scope.registerErrorText = data.message;
    });*/
};

  showLoginModal(){
    console.log("login button on toolbar");
  }

  showSingupModal(){
    console.log("singup button on toolbar");
  }

}
