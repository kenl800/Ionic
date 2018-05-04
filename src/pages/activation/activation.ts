import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivationFormPage } from '../activation-form/activation-form';

import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ActivationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {

	results: any;
	serialCode: any;
	serialPass: any;
	deactivation: any;
	demoStatus: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
		this.results = navParams.get('results');
		this.serialCode = navParams.get('serialCode');
		this.serialPass = navParams.get('serialPass');
	}

	activateProduct(){
		this.navCtrl.push(ActivationFormPage, { serialCode: this.serialCode, serialPass: this.serialPass , demoStatus: this.demoStatus});
	}

	// demo purpose only
	deactivateProduct(){
		this.deactivation = "https://care.x-one.asia/api/json_deactivate/" + this.serialCode;
    	this.restProvider.getProduct(this.deactivation)
	    .then(data => {
	      this.results = data;
	      this.results = Array.of(this.results);
	    });
	}
	// demo purpose only
	generateUserId(){
		this.demoStatus = true;
	}
}
