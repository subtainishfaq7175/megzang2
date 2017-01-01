import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {Product} from "../model/product";
import {Store} from "../model/store";
import {StoreStatus} from "../model/storeStatus";
import {API_URL} from "../app.config";
import {Option} from "../model/option";

declare var $:any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
   prodid=1;
  product:Product=new Product();
  store:Store=new Store();
  Package={};
  storeActive:StoreStatus=new StoreStatus();
  Productdetails:boolean = true;
  Packageinfo:boolean = true;
  buttonSvae:boolean = true;
  loading:boolean = true;
  SetOnlineLink:boolean = true;
  StoreForm:boolean = true;
  setHeadre:boolean = true;
  onlineStore:boolean = true;
  onlineStoreDetails:boolean = true;
  GoOnline:boolean = true;
  offlineStore:boolean = true;
  offlineStoreDetails:boolean = true;
  RetailsName:boolean = true;
  Retailer_error:boolean = true;
  locationField:boolean = true;
  autocomplete:boolean = true;
  autocomplete_eror:boolean = true;
  address:boolean = true;
  route:boolean = true;
  street_number:boolean = true;
  locality:boolean = true;
  postal_code:boolean = true;
  administrative_area_level_1:boolean = true;
  country:boolean = true;
  ProductForm:boolean = true;
  SetProductEro:boolean = true;
  SetProductEroHtml:boolean = true;
  ProductName:boolean = true;
  SetPriceClass:boolean = true;
  SetPriceClassHtml:boolean = true;
  Productprice:boolean = true;
  SetPriceClassEro:boolean = true;
  selectUsa:boolean = true;
  setBrace:boolean = true;
  addOption:boolean = true;
  addOptionProduct:boolean = true;
  upload_img:boolean = true;
  setSrcTag:boolean = true;
  PackageForm:boolean = true;
  img_name:boolean = true;
  w1:boolean = true;
  w2:boolean = true;
  w3:boolean = true;
  w4:boolean = true;
  s1:boolean = true;
  s2:boolean = true;
  s3:boolean = true;
  s4:boolean = true;
  s5:boolean = true;
  s6:boolean = true;
  setBraceValue:number=0.0;
  setSrcTagValue:string='images/test/prod.jpg';
  options:Array<Option>;
  img_nameValue;
  Retailer_errorValue;
  autocomplete_erorValue;




  @ViewChild('setSrcT') srcTag;



  ngAfterViewInit(): void {

    this.Productdetails=false;
    this.Packageinfo=false;
    this.buttonSvae=false;
    this.hideproductDetails();
    this.loading=false;
    if(this.localStorage.retrieve('ProductData')  || this.localStorage.retrieve('ProductData')==''){
      var TextVal=this.localStorage.retrieve("TextVal");
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      if(regexp.test(TextVal)==true){
        var Postdata={url:TextVal};
       this.loading=false;
       /*
       important
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
       */ /* $http.post('/api/Select/getHtml',Postdata).success(function(data){
         GetSetDataForurl(data,TextVal);
         }); */
      }else if(TextVal !=''){
        /*
        important
        setTimeout(function(){
          $('#offlineStore').trigger('click');
        },100);
      }else{
        $('#onlineStore').prop('checked',false);
        $('#offlineStore').prop('checked',false);

        */
      }
    }



  }


  constructor(private localStorage:LocalStorageService) {}
  ngOnInit() {
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

   saveLocalstoreProduct(){
  if(this.localStorage.retrieve('ProductData') !=''){
    var userData= this.localStorage.retrieve('user');
    var UserDataObj=JSON.parse(userData);
  /*
    IMPORTANT
    var userid={'book_by':UserDataObj.id};
    var ObjecDat=JSON.parse(localStorage.ProductData);
    var productdata=$.extend(userid,ObjecDat);*/
  /*  $.post('/api/Select/SaveProduct',productdata).success(function(data){
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
      });*/
  }
}
   GetSetDataForurl(data,Prdoucturl) {
   this.product.Productprice ="";
   this.product.ProductName="";
   this.setBraceValue=0.0;
   this.setSrcTag=false;
/*
important
    var Productname=$(data).filter('title').text();
    */
     var Productname='';
    var arr=['Amazon.in','Amazon.com','eBay','flipkart.com','snapdeal',':','|'];
    var FullName=Productname;
    if(Productname){
      for(var i=0;i<arr.length;i++){
        FullName=FullName.replace(arr[i],'');
      }
      if(FullName){
        this.product.ProductName=FullName;
       this.loading=false;
        this.Showonlinedata(Prdoucturl);
        this.ShowproductDetails();
        var CleanPricearr=['Rs.','US','$'];
        var ProductPrice=this.product.Productprice;

        //end
        if(ProductPrice){
          if(ProductPrice.indexOf(',') > 0){
            var priceval = ProductPrice.replace(',','');
            var braseVal=(parseInt(priceval)/ 5).toFixed(2) ;
          }else if(ProductPrice.indexOf('.') > 0){
            var priceval = ProductPrice.replace('$','');
            var braseVal= (parseInt(priceval) / 5 ).toFixed(2);
          }else{
            var braseVal= (parseInt(ProductPrice) / 5).toFixed(2) ;
          }
        }else{
          var braseVal='';
        }
        if(braseVal !=''){
          this.setBraceValue = parseInt(braseVal);
        }else{
          this.setBraceValue =0.0;
        }

      }else{
        this.loading=false;
      }
    }

}
   Showonlinedata(valurl){
 /*
  important
  $('#offlineStore').attr('checked',false);
  $('#onlineStore').attr('checked',true);*/
 this.onlineStoreDetails=true;
 this.offlineStoreDetails=false;
/*
  $('#onlineStore').prop('checked',true);
*/
     this.store.url=valurl;
}
   resetform(){

     this.Package={};
     this.store= new Store();
     this.storeActive= new StoreStatus();
     this.product=new Product();
  /*
  important
  $('#PackageForm')[0].reset();
  $('#StoreForm')[0].reset();
  $('#ProductForm')[0].reset();
  */

     while(this.options.length > 0) {
       this.options.pop();
     }
     this.prodid=1;
this.product.ProductName="";
this.product.Productprice="";
  /*
  important
  $('#SetProductEro').removeClass('success');
  $('#SetProductEro').removeClass('error');
  $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
  $('#SetPriceClass').removeClass('success');
  $('#SetPriceClass').removeClass('error');
  $("#SetPriceClassHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
  $("#SetPriceClassEro").html('');
*/
  this.setSrcTagValue='';

  this.img_nameValue="";
/*
important
  $('#upload-img').html('');
  $('#upload-img').html('<div class="dz-default dz-message"><span>Drag and drop images to upload <br> or <br> <a class="button nrm-pad uppercase mrg-t-s">Choose images</a></span></div>');
*/

}
   hideproductDetails(){
     this.Productdetails=false;
     this.Packageinfo=false;
     this.buttonSvae=false;

}
   ShowproductDetails(){
     this.Productdetails=true;
     this.Packageinfo=true;
     this.buttonSvae=true;
}
   productResrt(){
     this.Package={};
     this.store= new Store();
     this.storeActive= new StoreStatus();
     this.product=new Product();
     while(this.options.length > 0) {
       this.options.pop();
     }

}
   validationForm(){
  var RetailsName=this.store.RetailsName;
  if(RetailsName==''){
    this.Retailer_errorValue='required';
  }else{
    this.Retailer_errorValue='';  }
}
   validationForm1(){
  var autocomplete=this.store.address;
  if(autocomplete==''){
    this.autocomplete_erorValue='required';
  }else{
    this.autocomplete_erorValue='';
  }
}
   goOnline() {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var Prdoucturl=$('#SetOnlineLink').val();
    this.loading=true;
    this.hideproductDetails();
    this.productResrt();
    if(regexp.test(Prdoucturl)==true){
      //ShowproductDetails();
    }else{
      $('.loading').hide();
      //hideproductDetails();
    }
    /*
     important
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
     });*/
    /* $http.post('/api/Select/getHtml',Postdata).success(function(data){
     GetSetDataForurl(data,Prdoucturl);
     }); */
  }
   clickOfflineStrore() {
    this.resetform();
 /*
 important
    $('#onlineStore').attr('checked',false);
    $('#offlineStore').attr('checked',true);*/

    this.offlineStoreDetails=true;
    this.onlineStoreDetails=false;
    this.resetform();
    /*important*/
    if(this.storeActive.store=="2"){
      this.hideproductDetails();
      this.store.url="";
    }
  }
   clickOnlineStore() {
    this.resetform();
    /*
     important
     $('#offlineStore').attr('checked',false);
     $('#onlineStore').attr('checked',true);
     */
    this.onlineStoreDetails=true;
    this.onlineStoreDetails=false;
    this.resetform();
    if(this.storeActive.store=="1"){
      if(this.store.url==''){
        this.hideproductDetails();
      }
    }
  }
   keyupRetailsName(){
     var RetailsName=this.store.RetailsName;
     if(RetailsName!=''){
       this.ShowproductDetails();
       var TextVal=this.localStorage.retrieve("TextVal");
       this.product.ProductName=TextVal;
     }
     else{
       this.hideproductDetails();
        }
     this.validationForm();
  }
   keyupAutocomplete(){
     this.validationForm1();

   }
   keyupProductName(){
     var ProductName = this.product.ProductName;
   /*  if(ProductName !=''){
       $('#SetProductEro').addClass('success');
       $('#SetProductEro').removeClass('error');
       $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
     }else{
       $('#SetProductEro').removeClass('success');
       $('#SetProductEro').addClass('error');
       $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">close</i>');
     }*/
   }







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


}

