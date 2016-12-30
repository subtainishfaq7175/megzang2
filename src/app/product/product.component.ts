import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit()
  {
  if(this.user)
  {
    this.ShowUserName=true;
    this.showLogin=false;
    this.setUserName=""
    //loginclose
    //saveLocalstoreProduct() with time out
  }
  else
  {
    this.ShowUserName=false;
    this.showLogin=true;
  }
/*
    if(localStorage.ProductData ==undefined || localStorage.ProductData==''){
      var TextVal=localStorage.getItem("TextVal");
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      if(regexp.test(TextVal)==true){
        var Postdata={url:TextVal};
        $('.loading').show();
        $.ajax({
          type:'post',
          url: '/api/Select/getHtml',
          dataType: 'json',
          data:{url:TextVal},
          beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'bearer '+localStorage.satellizer_token);
            xhr.setRequestHeader('X-Alt-Referer',TextVal);
          },
          success: function(data){
            GetSetDataForurl(data.data,TextVal);
          }
        });
        /!* $http.post('/api/Select/getHtml',Postdata).success(function(data){
         GetSetDataForurl(data,TextVal);
         }); *!/
      }else if($.trim(TextVal) !=''){
        setTimeout(function(){
          $('#offlineStore').trigger('click');
        },100);
      }else{
        $('#onlineStore').prop('checked',false);
        $('#offlineStore').prop('checked',false);
      }
    }*/
  }
  loading:boolean=false;
  ShowUserName:boolean=false;
  showLogin:boolean=false;
  setUserName:String="";
  user:boolean=false ; //check user is loggedin or not; this is default action
  //loginClose REFERENCE TO LOGIN press close somehow
/*
  if(user){
    $('#ShowUserName').show();
    $('#showLogin').hide();
    $scope.userName=user.name;
    $('#setUserName').text(user.name);
    $('#loginClose').trigger('click');
    setTimeout(function(){
      saveLocalstoreProduct();
    },1000)
  }else{
  $('#ShowUserName').hide();
  $('#showLogin').show();
}*/

  saveProduct ()
  {
    console.log("save product");
    /*var userData=localStorage.getItem('user');
    var SetOnlineLink=$('#SetOnlineLink').val();
    var RetailsName=$('#RetailsName').val();
    var autocomplete=$('#autocomplete').val();
    var route=$('#route').val();
    var street_number=$('#street_number').val();
    var locality=$('#locality').val();
    var administrative_area_level_1=$('#administrative_area_level_1').val();
    var country=$('#country').val();
    var ProductName=$('#ProductName').val();
    var Productprice=$('#Productprice').val();
    var imgurl=$('#setSrcTag').attr('src');
    var ImgData=$('#img_name').text();
    var OpionName = $("input[name='optionsName\\[\\]']")
      .map(function(){return $(this).val();}).get();
    var Optionvalues = $("input[name='optionsValues\\[\\]']")
      .map(function(){return $(this).val();}).get();
    var ObjecDat={'ProductName':ProductName,
      'Productprice':Productprice,
      'RetailsName':RetailsName,
      'address':autocomplete,
      'StreetName':route,
      'City':locality,
      'State':administrative_area_level_1,
      'Country':country,
      'StreetNumber':street_number,
      'url':SetOnlineLink,
      'imgUrl':imgurl,
      'Img':ImgData,
      'OptionName':JSON.stringify(OpionName),
      'OptionName':JSON.stringify(OpionName),
      'accessToken':'WebApp'};

    $("#Wisherror").html('');
    if(ObjecDat.url==''){
      var SetvalEro='';
      $.each(ObjecDat,function(key,val){
        if(key=='ProductName' || key=='address' || key=='RetailsName' || key=='Productprice'){
          if(val==''){
            SetvalEro +=''+key+',';
          }
        }
      });
    }else{
      var SetvalEro='';
      $.each(ObjecDat,function(key,val){
        if(key=='ProductName' || key=='Productprice'){
          if(val==''){
            SetvalEro +=''+key+',';
          }
        }
      });
    }
    if($.trim(SetvalEro)!=''){
      var wish=SetvalEro.slice(0,-2);
      $('#Wisherror').html(wish);
      $('#Werror').trigger('click');
      return;
    }


    if(localStorage.satellizer_token && userData){
      var UserDataObj=JSON.parse(userData);
      var userid={'book_by':UserDataObj.id};
      var productdata=$.extend(userid,ObjecDat,$scope.Package);
      $http.post('/api/Select/SaveProduct',productdata).success(function(data){
        if(data.status=='success'){
          setTimeout(function(){
            $('#SetMsg').html('Your Product is Successfully created...!')
            $('#successTogalmsg').trigger('click');
            resetform();
            hideproductDetails();
            setTimeout(function(){
              $('#closeMesg').trigger('click');
              localStorage.setItem("TextVal",'');
            },3000);

          },200);
          $('#SetOnlineLink').val('');
        }

      })
        .error(function(data){
          $scope.loginError = true;
          $scope.registerErrorText = data.error;
        });
    }else{
      var productdata=$.extend(ObjecDat,$scope.Package);
      localStorage.setItem('lasturl',location.href);
      localStorage.setItem('ProductData',JSON.stringify(productdata));
      $('#LoginPoupOpen').trigger('click');
    }*/

  }

/*  $("#GoOnline").on("click",function(){
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  var Prdoucturl=$('#SetOnlineLink').val();
  $('.loading').show();
  hideproductDetails();
  productResrt();
  if(regexp.test(Prdoucturl)==true){
    //ShowproductDetails();
  }else{
    $('.loading').hide();
    //hideproductDetails();
  }
  var Postdata={url:Prdoucturl};
  $.ajax({
    type:'post',
    url: '/api/Select/getHtml',
    dataType: 'json',
    data:{url:Prdoucturl},
    beforeSend: function(xhr){
      xhr.setRequestHeader('Authorization', 'bearer '+localStorage.satellizer_token);
      xhr.setRequestHeader('X-Alt-Referer',Prdoucturl);
    },
    success: function(data){
      GetSetDataForurl(data.data,Prdoucturl);
    }
  });
  /!* $http.post('/api/Select/getHtml',Postdata).success(function(data){
   GetSetDataForurl(data,Prdoucturl);
   }); *!/
});

  $('#offlineStore').on('change',function(){
  resetform();
  $('#onlineStore').attr('checked',false);
  $('#offlineStore').attr('checked',true);
  $('#offlineStoreDetails').show();
  $('#onlineStoreDetails').hide();
  resetform();
  if($('#offlineStore').is(':checked')==true){
    hideproductDetails();
    $('#SetOnlineLink').val('');
  }
});
  $('#onlineStore').on('change',function(){
  resetform();
  $('#offlineStore').attr('checked',false);
  $('#onlineStore').attr('checked',true);
  $('#onlineStoreDetails').show();
  $('#offlineStoreDetails').hide();
  resetform();
  if($('#onlineStore').is(':checked')==true){
    if($('#SetOnlineLink').val()==''){
      hideproductDetails();
    }
  }
});
  $('#RetailsName').on('keyup',function(){
  var RetailsName=$('#RetailsName').val();
  if($.trim(RetailsName)!=''){
    ShowproductDetails();
    var TextVal=localStorage.getItem("TextVal");
    $('#ProductName').val(TextVal);
  }else{
    hideproductDetails();
  }
  validationForm();
});
  $('#autocomplete').on('keyup',function(){
  validationForm1();
});
  $('#ProductName').on('keyup',function(){
  var ProductName = $('#ProductName').val();
  if($.trim(ProductName) !=''){
    $('#SetProductEro').addClass('success');
    $('#SetProductEro').removeClass('error');
    $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
  }else{
    $('#SetProductEro').removeClass('success');
    $('#SetProductEro').addClass('error');
    $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">close</i>');
  }

});
  $('#ProductName').on('keyup',function(){
  var ProductName = $('#ProductName').val();
  if($.trim(ProductName) !=''){
    $('#SetProductEro').addClass('success');
    $('#SetProductEro').removeClass('error');
    $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
  }else{
    $('#SetProductEro').removeClass('success');
    $('#SetProductEro').addClass('error');
    $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">close</i>');
  }
});
  $('#Productprice').on('keyup',function(){
  var Productprice = $('#Productprice').val();
  if($.trim(Productprice)==''){
    $('#SetPriceClass').removeClass('success');
    $('#SetPriceClass').addClass('error');
    $("#SetPriceClassHtml").html('<i class="material-icons md-24 align-vmid">close</i>');
    $("#SetPriceClassEro").html('required');
  }else if($.isNumeric(Productprice)==true){
    if(Productprice <= 500){
      $('#SetPriceClass').addClass('success');
      $('#SetPriceClass').removeClass('error');
      $("#SetPriceClassHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
      $("#SetPriceClassEro").html('');
    }else{
      $('#SetPriceClass').removeClass('success');
      $('#SetPriceClass').addClass('error');
      $("#SetPriceClassHtml").html('<i class="material-icons md-24 align-vmid">close</i>');
      $("#SetPriceClassEro").html('Should be maximum 500$');
    }
  }else{
    $('#SetPriceClass').removeClass('success');
    $('#SetPriceClass').addClass('error');
    $("#SetPriceClassHtml").html('<i class="material-icons md-24 align-vmid">close</i>');
    $("#SetPriceClassEro").html('Enter The Number');
  }
  if(Productprice){
    var braseVal=Productprice / 5 ;
  }else{
    var braseVal='';
  }
  if(braseVal !=''){
    $('#setBrace').html(braseVal.toFixed(2) +'  bars');
  }else{
    $('#setBrace').html('0.0 bars');
  }
});
  $( "#addOptionProduct" ).click(function() {
  $('#addOption').append('<div id="add_cls_'+prodid+'" data_id="'+prodid+'"><div class="small-6 column">'+
    '<label>Option name</label>'+
    '<input type="text" placeholder="eg: Size, Color, ..." name="optionsName[]"/>'+
    '</div>'+
    '<div class="small-5 column">'+
    '<label>Value</label>'+
    '<input type="text"  name="optionsValues[]" />'+
    '</div>'+
    '<div class="small-1 column pos-rel">'+
    '<div class="l-space"></div>'+
    '<button class="addcloseButton" data_id="'+prodid+'"><i class="material-icons md-24">close</i></button>'+
    '</div></div>');
  prodid++;
});
  $('body').on("click",'.addcloseButton', function() {
  var id=$(this).attr('data_id');
  $('#add_cls_'+id).remove();
})*/;
}
