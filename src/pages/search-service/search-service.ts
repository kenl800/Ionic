import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceStatusPage } from '../service-status/service-status';

/**
 * Generated class for the SearchServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-service',
  templateUrl: 'search-service.html',
})
export class SearchServicePage {

	searchResults: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad SearchServicePage');
	}

	updateSearch(event){
		this.searchResults = event.target.value;
		// pass in this searchResults to API and get returned results. 
	}

	selectResult(){
		this.navCtrl.push(ServiceStatusPage, 
		{
		});
	}
}
