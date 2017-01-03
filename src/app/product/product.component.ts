import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {Product} from "../model/product";
import {Store} from "../model/store";
import {StoreStatus} from "../model/storeStatus";
import {API_URL} from "../app.config";
import {Option} from "../model/option";
import {ApiclientService} from "../services/apiclient.service";

declare var $:any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./merx.css']


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
  setSrcTagValue:string='';
  options:Array<Option> =[];
  img_nameValue;
  Retailer_errorValue;
  autocomplete_erorValue;




  @ViewChild('setSrcT') srcTag;



  ngAfterViewInit(): void {



  }


  constructor(private localStorage:LocalStorageService , private apiRest : ApiclientService) {}
  ngOnInit() {

    this.Productdetails=false;
    this.Packageinfo=false;
    this.buttonSvae=false;
    this.offlineStoreDetails=false;
    this.loading=false;
    this.onlineStoreDetails=false;

    //  if(this.localStorage.retrieve('ProductData')  || this.localStorage.retrieve('ProductData')==''){
    var TextVal=this.localStorage.retrieve("TextVal");
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ ;
    if(regexp.test(TextVal)==true){

      this.loading=false;
      this.storeActive.store="1";
      this.onlineStoreDetails=true;
      this.store.url=this.localStorage.retrieve("TextVal");
      this.apiRest.getHtml(TextVal).subscribe(data=>
        {
          this.GetSetDataForurl(data,TextVal);

        },
        error =>
        {
          console.log(error.json());
        }
      );

    }
    else if(TextVal !=''){
      console.log("its not url :" + TextVal);
      this.storeActive.store="2";
      this.clickOfflineStrore();

    }else{
      this.storeActive.store="";

      console.log("its not url but empty");


    }
    //  }


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
//important
    var  parser=new DOMParser();
    var  htmlDoc=parser.parseFromString(data, "text/xml");
    var  Productname=htmlDoc.getElementsByTagName("title").item(0).text;//.text();
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


        var Pricarr=['prcIsum','priceblock_ourprice'];
        for(var i=0;i <= Pricarr.length;i++){
          if(Pricarr[i]){
            if(htmlDoc.getElementById(Pricarr[i]).innerText){
              var price=htmlDoc.getElementById(Pricarr[i]).innerText;
              break;
            }
          }
        }
        // End Price

        //Img Tag Find
        var Imgarr=['landingImage','icImg'];
        for(var i=0;i <= Imgarr.length;i++){
          if(Imgarr[i]){
            if(htmlDoc.getElementById(Imgarr[i]).getAttribute('src')){
              var img=htmlDoc.getElementById(Imgarr[i]).getAttribute('src');
              break;
            }
          }
        }
        if(img){
         // important $('#setSrcTag').css('display','block');
          this.setSrcTagValue=img;
        }
        //End Img

        // Clean Price
        var CleanPricearr=['Rs.','US','$'];
        var ProductPrice=price;
        for(var i=0;i<CleanPricearr.length;i++){
          ProductPrice=ProductPrice.replace(CleanPricearr[i],'');
        }
       // $('#Productprice').val($.trim(ProductPrice));
        //end
        this.product.Productprice=ProductPrice;
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

 this.onlineStoreDetails=true;
 this.offlineStoreDetails=false;
 this.storeActive.store="1";
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
     this.offlineStoreDetails=false;



   }
   ShowproductDetails(){
     this.Productdetails=true;
     this.Packageinfo=true;
     this.buttonSvae=true;
     this.SetOnlineLink=true;
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
    var Prdoucturl=this.store.url;
    this.onlineStoreDetails=true;
   // this.productResrt();
    if(regexp.test(Prdoucturl)==true){
    //  this.ShowproductDetails();
    }else{
      $('.loading').hide();
      //hideproductDetails();
    }



     this.apiRest.getHtml(Prdoucturl).subscribe(data=>
       {
         this.GetSetDataForurl(data,Prdoucturl);

       },
       error =>
       {
         console.log(error.json());
       }
     );

  }
   clickOfflineStrore() {


     this.storeActive.store="2";
    this.offlineStoreDetails=true;
    this.onlineStoreDetails=false;
     this.Productdetails=false;
     this.Packageinfo=false;
     this.buttonSvae=false;

    if(this.storeActive.store=="2"){
      this.store.url="";
    }
  }
   clickOnlineStore() {

    this.onlineStoreDetails=true;
    this.SetOnlineLink=true;
     this.storeActive.store="1";
    if(this.storeActive.store=="1"){
      this.Productdetails=false;
      this.Packageinfo=false;
      this.buttonSvae=false;
      this.offlineStoreDetails=false;
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
   /*  important
   if(ProductName !=''){
       $('#SetProductEro').addClass('success');
       $('#SetProductEro').removeClass('error');
       $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">check</i><i class="material-icons md-24 align-vmid">close</i>');
     }else{
       $('#SetProductEro').removeClass('success');
       $('#SetProductEro').addClass('error');
       $("#SetProductEroHtml").html('<i class="material-icons md-24 align-vmid">close</i>');
     }*/
   }
   keyupProductprice(){
    var Productprice = this.product.Productprice;
 /*
   important
   if(Productprice==''){
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
    }*/

    if(Productprice){
      var braseVal= (parseInt(Productprice) / 5).toFixed(2) ;
    }else{
      var braseVal='';
    }
    if(braseVal != ''){
      this.setBraceValue=parseInt(braseVal);
    }else{
      this.setBraceValue = 0.0;
    }
}
   clickaddOptionProduct()
   {
     this.options.push(new Option());
   }









}

