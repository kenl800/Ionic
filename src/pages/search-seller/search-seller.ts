import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SellerFormPage } from '../seller-form/seller-form';
import { SellerTrackingPage } from '../seller-tracking/seller-tracking';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-search-seller',
  templateUrl: 'search-seller.html',
})
export class SearchSellerPage {

	searchResults: String;
	searchResults2: String;
	section: String;
	outputResults: any;
	outputResults2: any;
	outputResultsLength: any;
	outputResultsLength2: any;
	result: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider){
		this.section = "imei";
		this.searchResults = null;
		this.searchResults2 = null;
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad SearchSellerPage');
	}

	updateSearch(event){
		this.searchResults = event.target.value;
		//https://care.x-one.asia/api/json_claim_search_user?option=imei&phoneImei=6666666666
		this.productUrl = "https://care.x-one.asia/api/json_claim_search_user?option=imei&phoneImei=" + this.searchResults;
	    this.restProvider.getUsers(this.productUrl)
	    .then(data => {
			this.outputResults = data;
			//this.outputResults = Array.of(this.outputResults);
			this.outputResultsLength = this.outputResults.length;
			//console.log(this.outputResults);console.log(this.outputResultsLength);
		});
		// pass in this searchResults to API and get returned results. 
	}

	updateSearch2(event){
		this.searchResults2 = event.target.value;
		//https://care.x-one.asia/api/json_claim_search_user?option=nric&cusNric=961024136459
		this.productUrl = "https://care.x-one.asia/api/json_claim_search_user?option=nric&cusNric=" + this.searchResults2;
	    this.restProvider.getUsers(this.productUrl)
	    .then(data => {
			this.outputResults2 = data;
			//this.outputResults = Array.of(this.outputResults);
			this.outputResultsLength2 = this.outputResults2.length;
			//console.log(this.outputResults);
		});
		// pass in this searchResults to API and get returned results. 
	}

	// demo purpose only
	generateUserId(){
		this.demoStatus = true;
		this.presentToast();
	}

	selectResult(result){
		this.navCtrl.push(SellerFormPage, 
		{
			result: result,
			demoStatus: this.demoStatus
		});
	}

	enterTracking(){
		this.navCtrl.push(SellerTrackingPage, 
		{
		});
	}

}
