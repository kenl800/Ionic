import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ServiceStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-status',
  templateUrl: 'service-status.html',
})
export class ServiceStatusPage {

	scanStatus: any;
	scannedCode: any;
	finalUrl: any;
	obtainedId: any; 
	submitresults: any;
	getResults: any;
	getUrl: any;
	finalResults: any;
	re: number;
	x: number;
	getTrackingNo2: any;
	getAmountRequired: any;
	claimResults: Array<any>=[];

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
   		public loadingCtrl: LoadingController, 
		public restProvider: RestProvider,
   		private barcodeScanner: BarcodeScanner, 
   		private alertCtrl: AlertController) 
	{
		this.obtainedId = navParams.get('obtainedId');
		//this.doRefresh(0,this.obtainedId);
		this.doInitialize(this.obtainedId);
	}

	doRefresh(refresher,obtainedId){
		this.doInitialize(obtainedId);

		if (refresher != 0){
	    	setTimeout(() => {
		      refresher.complete();
		    }, 1000);
	    }
	}

	doInitialize(obtainedId){
		let loading = this.loadingCtrl.create({
	    	spinner: 'hide',
	    	content: 'Loading Please Wait...'	    	
	    });
	    loading.present();
		
		this.claimResults[3] = true;
		this.claimResults[4] = true;
		this.claimResults[5] = true;
		this.claimResults[6] = true;
		this.claimResults[7] = true;
		this.claimResults[8] = true;
		this.claimResults[9] = true;
		this.claimResults[10] = true;
 
		this.getUrl = "http://care.x-one.asia/api/json_claim_get_status/?cms_claim_id=" + obtainedId;
		this.restProvider.getProduct(this.getUrl)
	    .then(data => {
			this.getResults = data;
			//this.getResults = Array.of(this.getResults);
			//console.log(this.getResults.result.length)

			//If return >0 data
			if (this.getResults.result.length > 0){ 
				this.checkStatus(this.getResults);
			}
		});

		setTimeout(() => {
			loading.dismiss();
		}, 2000);
	}

	checkStatus(getResults){
		this.x = 0;
		while(this.x < getResults.result.length){
			this.re = getResults.result[this.x].cms_claim_status;
			//console.log(this.re);
			if(this.re == 3){
				this.claimResults[3] = false;
			}
			if(this.re == 4){
				this.claimResults[4] = false;
			}
			if(this.re == 5){
				this.claimResults[5] = false;
			}
			if(this.re == 6){
				this.claimResults[6] = false;
			}
			if(this.re == 7){
				this.claimResults[7] = false;
			}
			if(this.re == 8){
				this.claimResults[8] = false;
			}
			if(this.re == 9){
				this.claimResults[9] = false;
			}
			if(this.re == 10){
				this.claimResults[10] = false;
			}
			
			this.x = this.x + 1;
		}
		this.getAmountRequired = getResults.result[0].cms_claim_amount_required;
		this.getTrackingNo2 = getResults.result[0].cms_claim_tracking_no_2;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ServiceStatusPage');
	}

	scanCode() { 
	this.scanStatus = false;
	this.barcodeScanner.scan()
	.then(barcodeData => {
		this.scanStatus = true;
		this.scannedCode = barcodeData.text;
	});
	}

	presentAlert(obtainedId,itemReceived,itemChecking,paymentRequired,amountRequired,customerApproval,paymentReceived,phoneFixed,phoneDelivered,trackingNo,phoneReceived) {
  		let alert = this.alertCtrl.create({
		  title: 'Save status?',
		    message: 'Are you sure you want to save the current status? Once it is saved it cannot be changed.',
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
		          this.saveCurrent(obtainedId,itemReceived,itemChecking,paymentRequired,amountRequired,customerApproval,paymentReceived,phoneFixed,phoneDelivered,trackingNo,phoneReceived);
		        }
		      }
		    ]
		  });
		  alert.present();
	}

	saveCurrent(obtainedId,itemReceived,itemChecking,paymentRequired,amountRequired,customerApproval,paymentReceived,phoneFixed,phoneDelivered,trackingNo,phoneReceived){
		this.finalUrl = "http://care.x-one.asia/api/json_claim_update_status?cms_claim_id=" +obtainedId+ "&3=" +itemReceived+ "&4=" +itemChecking+ 
						"&5=" +paymentRequired+ "&6=" +customerApproval+ "&7=" +paymentReceived+ "&8=" +phoneFixed+ "&9=" +phoneDelivered+ "&10=" 
						+phoneReceived+ "&amountRequired=" +amountRequired+ "&trackingNo2=" +trackingNo;
		this.restProvider.getProduct(this.finalUrl)
	    .then(data => {
			this.submitresults = data;
			this.submitresults = Array.of(this.submitresults);
			//console.log(this.submitresults);
		});
		this.presentLoadingDefault();
	}

	presentLoadingDefault() {
		let loading = this.loadingCtrl.create({
			content: 'Saving Status...'
		});

		loading.present();

		setTimeout(() => {
			loading.dismiss();
			// Actions
			this.navCtrl.pop();
		}, 1200);
	}
}
