import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, AlertController} from 'ionic-angular';
//import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
import { FacebookUserModel } from '../facebook-login/facebook-user.model';
import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { ListingPage } from '../listing/listing';
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
  	toast: any;
  	checkedIdx: any;
  	options: any;
  	incentiveRate: number;
  	proceedStatus: any;
  	errorMessage: String;
  	//validations_form: FormGroup;


	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		private barcodeScanner: BarcodeScanner,
		public restProvider: RestProvider,
		public facebookLoginService: FacebookLoginService,
   		public modal: ModalController,
   		public loadingCtrl: LoadingController,
   		private toastCtrl: ToastController, 
		private alertCtrl: AlertController
   		//public formBuilder: FormBuilder
   	) 
	{
		
		this.serialCode = navParams.get('serialCode');
		this.serialPass = navParams.get('serialPass');
		this.demoStatus = navParams.get('demoStatus');

		this.checkedIdx = 0;

		this.options = [
		    'Normal Activation',
		    'Customer Form Activation',
		    'Customer QR Activation'
		];
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

	presentAlert0(userId,serialcode,serialpass,phoneImei) {
		this.proceedStatus = true;
		//If length less than 10 characters
		if (phoneImei.length <= 10){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'IMEI Number Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (this.proceedStatus === true){ 
	  		let alert = this.alertCtrl.create({
			  title: 'Confirm Submit Activation?',
			    message: 'You have selected Normal Activation. \n Commission will be RM 0.00',
		      	buttons: [
			      {
			        text: 'Cancel',
			        role: 'cancel',
			        handler: () => {
			          
			        }
			      },
			      {
			        text: 'Confirm',
			        handler: () => {
			          this.activateProduct0(userId,serialcode,serialpass,phoneImei);
			        }
			      }
			    ]
			  });
			  alert.present();
		}
	}

	presentAlert1(userId,serialcode,serialpass,cusName,cusEmail,cusNric,cusContact,phoneImei) {
		this.proceedStatus = true;

		if (cusName.length <= 5){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'Customer Name Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (cusEmail.length <= 8){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'Customer Email Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (cusNric.length <= 7){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'Customer IC/Passport Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (cusContact.length <= 9){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'Customer Contact No. Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (phoneImei.length <= 10){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'IMEI Number Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (this.proceedStatus === true){ 
	  		let alert = this.alertCtrl.create({
			  title: 'Confirm Submit Activation?',
			    message: 'You have selected Customer Form Activation. \n Commission will be RM 0.30',
		      	buttons: [
			      {
			        text: 'Cancel',
			        role: 'cancel',
			        handler: () => {
			          
			        }
			      },
			      {
			        text: 'Confirm',
			        handler: () => {
			          this.activateProduct1(userId,serialcode,serialpass,cusName,cusEmail,cusNric,cusContact,phoneImei);
			        }
			      }
			    ]
			  });
			  alert.present();
		}
	}

	presentAlert2(userId,serialcode,serialpass,buyerId,phoneImei,cusNric) {
  		this.proceedStatus = true;
  		if (phoneImei.length <= 10){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'IMEI Number Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (cusNric.length <= 7){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'Customer IC/Passport Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (this.proceedStatus === true){ 
	  		let alert = this.alertCtrl.create({
			  title: 'Confirm Submit Activation?',
			    message: 'You have selected Customer QR Activation. \n Commission will be RM 1.00',
		      	buttons: [
			      {
			        text: 'Cancel',
			        role: 'cancel',
			        handler: () => {
			          
			        }
			      },
			      {
			        text: 'Confirm',
			        handler: () => {
			          this.activateProduct2(userId,serialcode,serialpass,buyerId,phoneImei,cusNric);
			        }
			      }
			    ]
			  });
			  alert.present();
		}
	}

	/* Reusable in other submit places */
	activateProduct0(userId,serialcode,serialpass,phoneImei){
		this.incentiveRate = 0.00;
		this.productUrl = "https://care.x-one.asia/api/json_activate?serialcode=" + serialcode + "&serialpass=" + serialpass + "&seller_id=" + userId + "&phoneImei="+ phoneImei + "&incentiveRate=" + this.incentiveRate;
	    this.restProvider.getProduct(this.productUrl)
	    .then(data => {
			this.submitresults = data;
			this.submitresults = Array.of(this.submitresults);
			//console.log(this.submitresults);
		});
		this.presentLoadingDefault();
		
	}

	activateProduct1(userId,serialcode,serialpass,cusName,cusEmail,cusNric,cusContact,phoneImei){
		this.incentiveRate = 0.30;
		this.productUrl = "https://care.x-one.asia/api/json_activate?serialcode=" + serialcode + "&serialpass=" + serialpass + "&seller_id=" + userId + "&cusName="+ cusName + "&cusEmail="+ cusEmail + "&cusNric=" + cusNric + "&cusContact=" + cusContact + "&phoneImei=" + phoneImei + "&incentiveRate=" + this.incentiveRate;
	    this.restProvider.getProduct(this.productUrl)
	    .then(data => {
			this.submitresults = data;
			this.submitresults = Array.of(this.submitresults);
			//console.log(this.submitresults);
		});
		this.presentLoadingDefault();
	}

	activateProduct2(userId,serialcode,serialpass,buyerId,phoneImei,cusNric){
		this.incentiveRate = 1.00;
		this.productUrl = "https://care.x-one.asia/api/json_activate?serialcode=" + serialcode + "&serialpass=" + serialpass + "&seller_id=" + userId + "&buyerId=" +buyerId + "&phoneImei="+ phoneImei + "&cusNric=" + cusNric +"&incentiveRate=" + this.incentiveRate;
	    this.restProvider.getProduct(this.productUrl)
	    .then(data => {
			this.submitresults = data;
			this.submitresults = Array.of(this.submitresults);
			//console.log(this.submitresults);
		});
		this.presentLoadingDefault();
	}

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Activation has been completed',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

	presentLoadingDefault() {
		let loading = this.loadingCtrl.create({
			content: 'Activating Product...'
		});

		loading.present();

		setTimeout(() => {
			loading.dismiss();
			this.navCtrl.pop();
			this.navCtrl.pop();
			this.presentToast();
		}, 1200);
	}
}
