import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
//import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
import { FacebookUserModel } from '../facebook-login/facebook-user.model';
import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
/**
 * Generated class for the ActivationFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activation-form',
  templateUrl: 'activation-form.html',
})
export class ActivationFormPage {

	scannedCode: any;
	serialCode: any;
	serialPass: any;
	userUrl: any;
	results: any;
	results_users: any;
	submitresults: any;
	scanStatus = false;
  	user: FacebookUserModel = new FacebookUserModel();
  	demoStatus: any;
  	apiUrl: any;
  	productUrl: any;
  	loading: any;

  	//validations_form: FormGroup;


	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		private barcodeScanner: BarcodeScanner,
		public restProvider: RestProvider,
		public facebookLoginService: FacebookLoginService,
   		public modal: ModalController,
   		public loadingCtrl: LoadingController
   		//public formBuilder: FormBuilder
   	) 
	{
		
		this.serialCode = navParams.get('serialCode');
		this.serialPass = navParams.get('serialPass');
		this.demoStatus = navParams.get('demoStatus');
	}

	ionViewDidLoad() {
		this.loading = this.loadingCtrl.create();
		this.facebookLoginService.getFacebookUser()
	    .then((user) => {
	      this.user = user;
	      this.apiUrl = "https://care.x-one.asia/api/social_login/" + this.user.userId;
	      this.getFbUser(this.apiUrl);
	      this.loading.dismiss();
	    }, (error) => {
	      console.log(error);
	      this.loading.dismiss();
	    });
/*
	    this.validations_form = this.formBuilder.group({
	    	cusNric: new FormControl('', Validators.required),
		    cusContact: new FormControl('', Validators.required),
		    phoneImei: new FormControl('', Validators.required),
      		checkTerms: new FormControl(true, Validators.pattern('true'))
     	});
*/
	    // For Demo Purposes only
	    if(this.demoStatus === true){ 
	      	this.apiUrl = "https://care.x-one.asia/api/social_login/1895006910514774";
	      	this.getFbUser(this.apiUrl);
	      }
	  }
/*
	validation_messages = {
	    'cusNric': [
	      { type: 'required', message: 'Name is required.' }
	    ],
	    'cusContact': [
	      { type: 'required', message: 'Name is required.' }
	    ],
	    'phoneImei': [
	      { type: 'required', message: 'Name is required.' }
	    ],
	    'checkTerms': [
	      { type: 'pattern', message: 'You must accept terms and conditions.' }
	    ],
  	};
*/

	scanCode() { 
	this.scanStatus = false;
	this.barcodeScanner.scan()
	.then(barcodeData => {
	  this.scanStatus = true;
	  this.scannedCode = barcodeData.text;
	  this.userUrl = "https://care.x-one.asia/api/json_get_user/" + this.scannedCode;
	  this.restProvider.getProduct(this.userUrl)
	  .then(data => {
	      this.results = data;
	      this.results = Array.of(this.results);
	    });
	});
	}

	getFbUser(url) {
      this.restProvider.getFbUser(url)
      .then(data => {
         this.results_users = data;
         this.results_users = Array.of(this.results_users);
      });
   	}

	showTermsModal() {
	    let modal = this.modal.create(TermsOfServicePage);
	    modal.present();
	  }


	activateProduct(userId,serialcode,serialpass,sellerId,sellerName,cusNric,cusContact,phoneImei){
		this.productUrl = "https://care.x-one.asia/api/json_activate?u_id=" + userId + "&serialcode=" + serialcode + "&serialpass=" + serialpass + "&seller_id=" + sellerId + "&sellerName=" + sellerName + "&cusNRIC=" + cusNric + "&cusContact=" + cusContact + "&imeiNo=" + phoneImei;
	    this.restProvider.getProduct(this.productUrl)
	    .then(data => {
	      this.submitresults = data;
	      this.submitresults = Array.of(this.submitresults);
	      console.log(this.submitresults);
		});
	}
}
