import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FacebookUserModel } from '../facebook-login/facebook-user.model';
import { FacebookLoginService } from '../facebook-login/facebook-login.service';

/**
 * Generated class for the SellerFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seller-form',
  templateUrl: 'seller-form.html',
})
export class SellerFormPage {

	productUrl: any;
	submitresults: any;
	cusNoStatus: any;
	cusSecNoStatus: any;
	newVal: any;
	results: any;
  	user: FacebookUserModel = new FacebookUserModel();
  	demoStatus: any;
  	proceedStatus: any;


	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public restProvider: RestProvider,
   		public loadingCtrl: LoadingController,
   		private toastCtrl: ToastController,
		public facebookLoginService: FacebookLoginService, 
		private alertCtrl: AlertController
   	) {
		this.cusNoStatus = true;
		this.cusSecNoStatus = true;
		this.results = navParams.get('result');
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

	    if(this.demoStatus === true){ 
	      	this.apiUrl = "https://care.x-one.asia/api/social_login/1895006910514774";
	      	this.getFbUser(this.apiUrl);
	    }
	}

	getFbUser(url) {
      this.restProvider.getFbUser(url)
      .then(data => {
         this.results_users = data;
         this.results_users = Array.of(this.results_users);
      });
   	}

   	presentAlert(serialId,buyerId,productName,sellerId,phoneImei,phoneModel,cusNric,cusNo,cusSecNo,issue,remarks) {
		this.proceedStatus = true;

		if (cusNo.length <= 9){
			this.proceedStatus = false;
			let alert = this.alertCtrl.create({
				title: 'Submit Error',
				subTitle: 'Customer Contact No. Length not enough',
				buttons: ['OK']
			});
			alert.present();
		}

		if (this.proceedStatus === true){ 
	  		let alert = this.alertCtrl.create({
			  title: 'Confirm Submit Claim?',
			    message: 'Click Confirm to submit claim',
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
			         	this.submitForm(serialId,buyerId,productName,sellerId,phoneImei,phoneModel,cusNric,cusNo,cusSecNo,issue,remarks);
			        }
			      }
			    ]
			  });
			  alert.present();
		}
	}

	submitForm(serialId,buyerId,productName,sellerId,phoneImei,phoneModel,cusNric,cusNo,cusSecNo,issue,remarks){  
		this.productUrl = "http://care.x-one.asia/api/json_add_claim?cms_claim_pic=" + sellerId + "&cms_claim_serial_id=" + serialId + "&cms_claim_customer_id=" + buyerId + "&cms_claim_phone_imei=" + phoneImei + "&cms_claim_phone_model=" + phoneModel + "&cms_claim_customer_NRIC=" +cusNric+ "&cms_claim_customer_contact_no=" + cusNo + "&cms_claim_customer_sec_contact_no=" + cusSecNo + "&cms_claim_issue=" + issue + "&cms_claim_remark=" + remarks;
		 this.restProvider.getProduct(this.productUrl)
	    .then(data => {
			this.submitresults = data;
			this.submitresults = Array.of(this.submitresults);
			//console.log(this.submitresults);
		});
		this.presentLoadingDefault();
	}

	presentLoadingDefault() {
		let loading = this.loadingCtrl.create({
			content: 'Submitting Claim...'
		});

		loading.present();

		setTimeout(() => {
			loading.dismiss();
			this.navCtrl.pop();
			this.navCtrl.pop();
			this.presentToast();
		}, 1200);
	}

		presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Claim has been submitted',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

}
