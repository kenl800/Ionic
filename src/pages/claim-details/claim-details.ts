import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController} from 'ionic-angular';

import { SellerArrivalPage } from '../seller-arrival/seller-arrival';
import { SellerTrackingPage } from '../seller-tracking/seller-tracking';
import { ServiceStatusPage } from '../service-status/service-status';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ClaimDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-claim-details',
  templateUrl: 'claim-details.html',
})
export class ClaimDetailsPage {
	obtainedResult: any;
	getUrl: any;
	finalUrl: String; 
	getResults: any;
	
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public actionSheetCtrl: ActionSheetController,
		public restProvider: RestProvider,
		public loadingCtrl: LoadingController
	) {
		this.obtainedResult = navParams.get('obtainedResult');
		this.doRefresh(0,this.obtainedResult.cms_claim_id);
		this.showAllStatus(this.obtainedResult.cms_claim_id);
	}

	doRefresh(refresher,getid){
		this.showAllStatus(getid);

		if (refresher != 0){
	    	setTimeout(() => {
		      refresher.complete();
		    }, 1000);
	    }
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClaimDetailsPage');
	}

	showAllStatus(id){
		this.getUrl = "http://care.x-one.asia/api/json_claim_get_status/?cms_claim_id=" + id;
		this.restProvider.getUsers(this.getUrl)
	    .then(data => {
			this.getResults = data;
			//console.log(this.getResults);
		});
	}

	showOptions(id){
		let actionsheet = this.actionSheetCtrl.create({
		buttons:[{
			text: 'Enter Tracking No.' /*[Seller] */,
			handler: () => {
			this.enterTracking(id);
		}
		}, /*{
			text: 'Confirm Item Received [Seller]',
			handler: () => {
			this.confirmArrival();
		}
		},*/
		{
			text: 'Update Status' /*[Service Centre]*/,
			handler: () => {
			this.updateStatus(id);
		}
		},{
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
        }
		}]
		});
		actionsheet.present();
	}

	enterTracking(id){
		this.navCtrl.push(SellerTrackingPage, 
		{
			obtainedId: id
		});
	}

	confirmArrival(){
		this.navCtrl.push(SellerArrivalPage, 
		{

		});
	}

	updateStatus(id){
		this.navCtrl.push(ServiceStatusPage, 
		{
			obtainedId: id
		});
	}
}
