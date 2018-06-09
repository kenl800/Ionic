import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SellerTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seller-tracking',
  templateUrl: 'seller-tracking.html',
})
export class SellerTrackingPage {

	scanStatus: any;
	scannedCode: any;
	obtainedId: string;
	triggerDisable: any;
	productUrl: any;
	submitresults: any;
	url: any;
	getResults: any;
	getTracking: any;

	constructor
	(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private barcodeScanner: BarcodeScanner, 
		private alertCtrl: AlertController, 
		public restProvider: RestProvider,
   		public loadingCtrl: LoadingController,
   		private toastCtrl: ToastController
	) {
		this.obtainedId = navParams.get('obtainedId'); 
		this.url = "http://care.x-one.asia/api/json_claim_list?cms_claim_id=" + this.obtainedId;
		this.restProvider.getUsers(this.url)
	    .then(data => {
			this.getResults = data;
			this.getTracking = this.getResults[0].cms_claim_tracking_no_1;
		});
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad SellerTrackingPage');
	}

	scanCode() { 
		this.scanStatus = false;
		this.barcodeScanner.scan()
		.then(barcodeData => {
			this.scanStatus = true;
			this.scannedCode = barcodeData.text;
			this.getTracking = this.scannedCode;
		});
	}

	presentAlert(obtainedId,trackingNo) {
  		let alert = this.alertCtrl.create({
		  title: 'Confirm Tracking Number?',
		    message: trackingNo,
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
		          this.saveCurrent(obtainedId,trackingNo);
		        }
		      }
		    ]
		  });
		  alert.present();
	}

	saveCurrent(obtainedId,trackingNo){
		this.productUrl = "http://care.x-one.asia/api/json_update_claim?cms_claim_id=" + obtainedId + "&cms_claim_tracking_no_1=" + trackingNo;
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
			content: 'Saving Tracking Number...'
		});

		loading.present();

		setTimeout(() => {
			loading.dismiss();
			this.navCtrl.pop();
			this.presentToast();
		}, 600);
	}

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Saved Successfully',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
}
