import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  {

  loading:boolean=false;
  ShowUserName:boolean=false;
  showLogin:boolean=false;
  userName: String="";

  constructor() { }




  //product={};
  //store={};
  //Package={};
  //storeActive={};
  //hideproductDetails();
 // $('.loading').hide();

/*   user:boolean = false;//angular.fromJson(localStorage.getItem('user'));
  if (user){
    //$('#ShowUserName').show();
    //$('#showLogin').hide();
    this.ShowUserName=true;
    this.showLogin=false;
    this.userName="";//=user.name;
   // $('#setUserName').text(user.name);
    //$('#loginClose').trigger('click');
    //setTimeout(function(){
      //saveLocalstoreProduct();
    //},1000)
  }else
    {
    ShowUserName=false;
   showLogin=true;

  //$('#ShowUserName').hide();
  //$('#showLogin').show();
    }*/
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
 /*
$("#GoOnline").on("click",function(){
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
});
};

function saveLocalstoreProduct(){
  if(localStorage.ProductData !=''){
    var userData=localStorage.getItem('user');
    var UserDataObj=JSON.parse(userData);
    var userid={'book_by':UserDataObj.id};
    var ObjecDat=JSON.parse(localStorage.ProductData);
    var productdata=$.extend(userid,ObjecDat);
    $.post('/api/Select/SaveProduct',productdata).success(function(data){
      if(data.status=='success'){
        setTimeout(function(){
          $('#SetMsg').html('Your Product is Successfully created...!')
          $('#successTogalmsg').trigger('click');
          resetform();
          hideproductDetails();
          setTimeout(function(){
            $('#closeMesg').trigger('click');
            localStorage.setItem("TextVal",'');
            localStorage.setItem('ProductData','');
          },3000);

        },200);
        $('#SetOnlineLink').val('');
      }

    })
      .error(function(data){
        $scope.loginError = true;
        $scope.registerErrorText = data.error;
      });
  }
}
function GetSetDataForurl(data,Prdoucturl){
  $('#Productprice').val('')
  $('#ProductName').val('');
  $('#setBrace').html('0.0 bars');
  $('#setSrcTag').attr('src','');
  $('#setSrcTag').css('display','none');
  setTimeout(function(){
    var Productname=$(data).filter('title').text();
    var arr=['Amazon.in','Amazon.com','eBay','flipkart.com','snapdeal',':','|'];
    var FullName=Productname;
    if(Productname){
      for(var i=0;i<arr.length;i++){
        FullName=FullName.replace(arr[i],'');
      }
      if(FullName){
        $('#ProductName').val($.trim(FullName));
        $('.loading').hide();
        Showonlinedata(Prdoucturl);
        ShowproductDetails();

        ////Price Tag Find
        var Pricarr=['#prcIsum','#priceblock_ourprice'];
        for(var i=0;i <= Pricarr.length;i++){
          if(Pricarr[i]){
            if($(data).find(Pricarr[i]).text()){
              var price=$(data).find(Pricarr[i]).text();
              break;
            }
          }
        }
        // End Price

        //Img Tag Find
        var Imgarr=['#landingImage','#icImg'];
        for(var i=0;i <= Imgarr.length;i++){
          if(Imgarr[i]){
            if($(data).find(Imgarr[i]).attr('src')){
              var img=$(data).find(Imgarr[i]).attr('src');
              break;
            }
          }
        }
        if(img){
          $('#setSrcTag').css('display','block');
          $('#setSrcTag').attr('src',img);
        }
        //End Img

        // Clean Price
        var CleanPricearr=['Rs.','US','$'];
        var ProductPrice=price;
        for(var i=0;i<CleanPricearr.length;i++){
          ProductPrice=ProductPrice.replace(CleanPricearr[i],'');
        }
        $('#Productprice').val($.trim(ProductPrice));
        //end
        if(ProductPrice){
          if(ProductPrice.indexOf(',') > 0){
            var priceval = ProductPrice.replace(',','');
            var braseVal=priceval / 5 ;
          }else if(ProductPrice.indexOf('.') > 0){
            var priceval = ProductPrice.replace('$','');
            var braseVal= priceval / 5 ;
          }else{
            var braseVal= ProductPrice / 5 ;
          }
        }else{
          var braseVal=0;
        }
        if(braseVal !=''){
          $('#setBrace').html(braseVal.toFixed(2) +'  bars');
        }else{
          $('#setBrace').html('0.0 bars');
        }

      }else{
        $('.loading').hide();
      }
    }
  },1000);
}
function Showonlinedata(valurl){
  $('#offlineStore').attr('checked',false);
  $('#onlineStore').attr('checked',true);
  $('#onlineStoreDetails').show();
  $('#offlineStoreDetails').hide();
  $('#onlineStore').prop('checked',true);
  $('#SetOnlineLink').val(valurl);
}
function resetform(){

  $('#PackageForm')[0].reset();
  $('#StoreForm')[0].reset();
  $('#ProductForm')[0].reset();
  $('#addOption').html('');
  prodid=1;

  $('#ProductName').val('');
  $('#SetProductEro').removeClass('success');
  $('#SetProductEro').removeClass('error');
  $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');

  $('#Productprice').val('');
  $('#SetPriceClass').removeClass('success');
  $('#SetPriceClass').removeClass('error');
  $("#SetPriceClassHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
  $("#SetPriceClassEro").html('');

  $('#setSrcTag').attr('src','');
  $('#setSrcTag').css('display','none');
  $('#RetailsName').val('');

  $('#img_name').html('');
  $('#upload-img').html('');
  $('#upload-img').html('<div class="dz-default dz-message"><span>Drag and drop images to upload <br> or <br> <a class="button nrm-pad uppercase mrg-t-s">Choose images</a></span></div>');

}
function hideproductDetails(){
  $('#Productdetails').hide();
  $('#Packageinfo').hide();
  $('#buttonSvae').hide();
}
function ShowproductDetails(){
  $('#Productdetails').show();
  $('#Packageinfo').show();
  $('#buttonSvae').show();
}
function productResrt(){
  $('#PackageForm')[0].reset();
  $('#ProductForm')[0].reset();
  $('#addOption').html('');
  prodid=1;
}
function validationForm(){
  var RetailsName=$('#RetailsName').val();
  if($.trim(RetailsName)==''){
    $('#Retailer_error').html('required')
  }else{
    $('#Retailer_error').html('')
  }
}
function validationForm1(){
  var autocomplete=$('#autocomplete').val();
  if($.trim(autocomplete)==''){
    $('#autocomplete_eror').html('required')
  }else{
    $('#autocomplete_eror').html('')
  }}

*/
   saveProduct()
  {
    /* var userData=localStorage.getItem('user');
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
}
