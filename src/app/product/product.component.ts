import {Component, OnInit, AfterViewInit} from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {Product} from "../model/product";
import {Store} from "../model/store";
import {StoreStatus} from "../model/storeStatus";

declare var $:any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
   prodid=1;
  ngAfterViewInit(): void {
    this.hideproductDetails();
    $('.loading').hide();
    if(this.localStorage.retrieve('ProductData') ||this.localStorage.retrieve('ProductData')==''){
      var TextVal=this.localStorage.retrieve("TextVal");
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
            xhr.setRequestHeader('Authorization', 'bearer '+this.localStorage.retrieve('satellizer_token'));
            xhr.setRequestHeader('X-Alt-Referer',TextVal);
          },
          success: function(data){
            this.GetSetDataForurl(data.data,TextVal);
          }
        });
        /* $http.post('/api/Select/getHtml',Postdata).success(function(data){
         GetSetDataForurl(data,TextVal);
         }); */
      }else if($.trim(TextVal) !=''){
        setTimeout(function(){
          $('#offlineStore').trigger('click');
        },100);
      }else{
        $('#onlineStore').prop('checked',false);
        $('#offlineStore').prop('checked',false);
      }
    }
    $("#GoOnline").on("click",function(){
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      var Prdoucturl=$('#SetOnlineLink').val();
      $('.loading').show();
      this.hideproductDetails();
      this.productResrt();
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
          xhr.setRequestHeader('Authorization', 'bearer '+this.localStorage.retrieve('satellizer_token'));
          xhr.setRequestHeader('X-Alt-Referer',Prdoucturl);
        },
        success: function(data){
          this.GetSetDataForurl(data.data,Prdoucturl);
        }
      });
      /* $http.post('/api/Select/getHtml',Postdata).success(function(data){
       GetSetDataForurl(data,Prdoucturl);
       }); */
    });
    $('#offlineStore').on('change',function(){
      this.resetform();
      $('#onlineStore').attr('checked',false);
      $('#offlineStore').attr('checked',true);
      $('#offlineStoreDetails').show();
      $('#onlineStoreDetails').hide();
      this.resetform();
      if($('#offlineStore').is(':checked')==true){
        this.hideproductDetails();
        $('#SetOnlineLink').val('');
      }
    });
    $('#onlineStore').on('change',function(){
      this.resetform();
      $('#offlineStore').attr('checked',false);
      $('#onlineStore').attr('checked',true);
      $('#onlineStoreDetails').show();
      $('#offlineStoreDetails').hide();
      this.resetform();
      if($('#onlineStore').is(':checked')==true){
        if($('#SetOnlineLink').val()==''){
          this.hideproductDetails();
        }
      }
    });
    $('#RetailsName').on('keyup',function(){
      var RetailsName=$('#RetailsName').val();
      if($.trim(RetailsName)!=''){
        this.ShowproductDetails();
        var TextVal=localStorage.getItem("TextVal");
        $('#ProductName').val(TextVal);
      }else{
        this.hideproductDetails();
      }
      this.validationForm();
    });
    $('#autocomplete').on('keyup',function(){
      this.validationForm1();
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
      var braseVal;
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
         braseVal=Productprice / 5 ;
      }else{
         braseVal='';
      }
      if(braseVal !='' && typeof braseVal!="undefined"){
        $('#setBrace').html(braseVal.toFixed(2) +'  bars');
      }else{
        $('#setBrace').html('0.0 bars');
      }
    });
    $( "#addOptionProduct" ).click(function() {
      $('#addOption').append('<div id="add_cls_'+this.prodid+'" data_id="'+this.prodid+'"><div class="small-6 column">'+
        '<label>Option name</label>'+
        '<input type="text" placeholder="eg: Size, Color, ..." name="optionsName[]"/>'+
        '</div>'+
        '<div class="small-5 column">'+
        '<label>Value</label>'+
        '<input type="text"  name="optionsValues[]" />'+
        '</div>'+
        '<div class="small-1 column pos-rel">'+
        '<div class="l-space"></div>'+
        '<button class="addcloseButton" data_id="'+this.prodid+'"><i class="material-icons md-24">close</i></button>'+
        '</div></div>');
      this.prodid++;
    });
    $('body').on("click",'.addcloseButton', function() {
      var id=$(this).attr('data_id');
      $('#add_cls_'+id).remove();
    });


  }


  constructor(private localStorage:LocalStorageService) {}
  ngOnInit() {
  }


  loading:boolean=false;
  user:boolean=false;
  product:Product=new Product();
  store:Store=new Store();
  Package={};
  storeActive:StoreStatus=new StoreStatus();

   GetSetDataForurl(data,Prdoucturl){
  $('#Productprice').val('');
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
        this.Showonlinedata(Prdoucturl);
        this.ShowproductDetails();

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
        var braseVal;
        var ProductPrice=price;
        for(var i=0;i<CleanPricearr.length;i++){
          ProductPrice=ProductPrice.replace(CleanPricearr[i],'');
        }
        $('#Productprice').val($.trim(ProductPrice));
        //end
        if(ProductPrice){
          if(ProductPrice.indexOf(',') > 0){
            var priceval = ProductPrice.replace(',','');
             braseVal=priceval / 5 ;
          }else if(ProductPrice.indexOf('.') > 0){
            var priceval = ProductPrice.replace('$','');
             braseVal= priceval / 5 ;
          }else{
             braseVal= ProductPrice / 5 ;
          }
        }else{
           braseVal=0;
        }
        if(braseVal !='' &&typeof braseVal != "undefined"){
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
   hideproductDetails(){
    $('#Productdetails').hide();
    $('#Packageinfo').hide();
    $('#buttonSvae').hide();
  }
   Showonlinedata(valurl){
  $('#offlineStore').attr('checked',false);
  $('#onlineStore').attr('checked',true);
  $('#onlineStoreDetails').show();
  $('#offlineStoreDetails').hide();
  $('#onlineStore').prop('checked',true);
  $('#SetOnlineLink').val(valurl);
}
   ShowproductDetails(){
  $('#Productdetails').show();
  $('#Packageinfo').show();
  $('#buttonSvae').show();
}
   productResrt(){
    $('#PackageForm')[0].reset();
    $('#ProductForm')[0].reset();
    $('#addOption').html('');
    this.prodid=1;
  }
   resetform(){

  $('#PackageForm')[0].reset();
  $('#StoreForm')[0].reset();
  $('#ProductForm')[0].reset();
  $('#addOption').html('');
  this.prodid=1;

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
   validationForm(){
    var RetailsName=$('#RetailsName').val();
    if($.trim(RetailsName)==''){
      $('#Retailer_error').html('required')
    }else{
      $('#Retailer_error').html('')
    }
  }
   validationForm1(){
    var autocomplete=$('#autocomplete').val();
    if($.trim(autocomplete)==''){
      $('#autocomplete_eror').html('required')
    }else{
      $('#autocomplete_eror').html('')
    }
  }

  saveProduct = function () {
    var userData=this.localStorage.retrieve('user');
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


    if(this.localStorage.retrieve('satellizer_token') && userData){
      var UserDataObj=JSON.parse(userData);
      var userid={'book_by':UserDataObj.id};
      var productdata=$.extend(userid,ObjecDat,this.Package);
      /*$http.post('/api/Select/SaveProduct',productdata).success(function(data){
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
        });*/
    }else{
     /* var productdata=$.extend(ObjecDat,$scope.Package);
      localStorage.setItem('lasturl',location.href);
      localStorage.setItem('ProductData',JSON.stringify(productdata));
      $('#LoginPoupOpen').trigger('click');
   */ }
  };



}

