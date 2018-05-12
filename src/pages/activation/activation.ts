import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
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
	alert: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public restProvider: RestProvider, 
		private alertCtrl: AlertController,
   		private toastCtrl: ToastController
   	) {
		this.results = navParams.get('results');
		this.serialCode = navParams.get('serialCode');
		this.serialPass = navParams.get('serialPass');
	}

	activateProduct(){
		this.navCtrl.push(ActivationFormPage, { serialCode: this.serialCode, serialPass: this.serialPass , demoStatus: this.demoStatus});
	}

	// demo purpose only
	deactivateProduct(){
		//this.deactivation = "https://care.x-one.asia/api/json_deactivate/?code="+ this.serialCode + "&pass=" + this.serialPass;
		this.deactivation = "https://care.x-one.asia/api/json_deactivate?serialcode="+ this.serialCode + "&serialpass=" + this.serialPass;
    	this.restProvider.getProduct(this.deactivation)
	    .then(data => {
	      this.results = data;
	      this.results = Array.of(this.results);
	    });
	}
	// demo purpose only
	generateUserId(){
		this.demoStatus = true;
		this.presentToast();
	}

	presentAlert() {
  		let alert = this.alertCtrl.create({
		  title: 'Confirm Deactivation',
		    message: 'Are you sure you want to deactivate this product?',
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
		          this.deactivateProduct();
		          this.presentToast2();
		        }
		      }
		    ]
		  });
		  alert.present();
	}

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Facebook Login Completed',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

	presentToast2() {
		let toast = this.toastCtrl.create({
			message: 'Product Deactivated',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}


}
