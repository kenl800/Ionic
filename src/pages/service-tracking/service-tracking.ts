import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ServiceTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-tracking',
  templateUrl: 'service-tracking.html',
})
export class ServiceTrackingPage {

	userId: any;
	finalUrl: any;
	finalResults: any;


	constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
		this.userId = navParams.get('userId');
		//console.log(this.userId);
		this.finalUrl = "http://care.x-one.asia/api/json_store_show_members?userId=" + this.userId;
		this.restProvider.getUsers(this.finalUrl)
	    .then(data => {
			this.finalResults = data;
			this.finalResults = Array.of(this.finalResults);
			console.log(this.finalResults);
		});
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad ServiceTrackingPage');
	}



}
