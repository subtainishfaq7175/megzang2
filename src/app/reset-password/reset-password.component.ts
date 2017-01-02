import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',

})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
/*
important
    newUser.email=$state.params.email;
    newUser.token=$state.params.token;
*/

  }

  email='';
  password='';
  newUser:User;
  resetError:boolean=false;
  resetErrorText='';
  resetMsgText='';
  resetMsg:boolean=true;

  resetPassword = function () {
  /*$http.post('/api/resetpassword',$scope.newUser)
    .success(function(data){
      $scope.email=$scope.newUser.email;
      $scope.password=$scope.newUser.password;
      $scope.token=$scope.newUser.token;
      if(data.message){
        $scope.email=$scope.newUser.email;
        $scope.resetMsg=true;
        $scope.resetMsgText='';
        if(angular.isArray(data.message)){
          for(var i=0;i<data.message.length;i++){
            $scope.resetMsgText+=data.message+"\n";
          }
        }else{
          $scope.resetMsgText=data.message;
        }
      }
    })
    .error(function(data){
      $scope.resetMsg=true;
      $scope.resetMsgText='Something went wrong';
    })*/
};

}
