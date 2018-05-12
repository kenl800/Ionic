import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryDetailsPage } from '../history-details/history-details';
import { ClaimDetailsPage } from '../claim-details/claim-details';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

	section: String;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.section = "purchase";
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad HistoryPage');
	}

	purchaseItem(result: any) {
		this.navCtrl.push(HistoryDetailsPage, 
		{

		});
	}

	claimItem(result: any) {
		this.navCtrl.push(ClaimDetailsPage, 
		{

		});
	}

}
