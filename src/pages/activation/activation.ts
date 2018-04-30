import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivationFormPage } from '../activation-form/activation-form';

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.results = navParams.get('results');
	}


	activateProduct(){
		this.navCtrl.push(ActivationFormPage, { });
	}
}
