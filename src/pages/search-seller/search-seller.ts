import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SellerFormPage } from '../seller-form/seller-form';

/**
 * Generated class for the SearchSellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-seller',
  templateUrl: 'search-seller.html',
})
export class SearchSellerPage {

	searchResults: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad SearchSellerPage');
	}

	updateSearch(event){
		this.searchResults = event.target.value;
		// pass in this searchResults to API and get returned results. 
	}

	selectResult(){
		this.navCtrl.push(SellerFormPage, 
		{
		});
	}

}
