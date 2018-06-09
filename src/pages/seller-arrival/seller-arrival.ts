import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SellerArrivalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seller-arrival',
  templateUrl: 'seller-arrival.html',
})
export class SellerArrivalPage {

getid: any;
getUserId: any;
getUrl: any;
getResults: any;

  constructor
  (
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private alertCtrl: AlertController,
  	public restProvider: RestProvider,
   	private toastCtrl: ToastController
  ) {
  	this.getid = navParams.get('id'); 
  	this.getUserId = navParams.get('userId'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerArrivalPage');
  }

  presentAlert(storeId,userId,storeContact,storeEmail){
  	let alert = this.alertCtrl.create({
		  title: 'Confirm Submit?',
		    message: 'After submit, your form will be reviewed and approved.',
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
		        	this.addClaimStore(storeId,userId,storeContact,storeEmail);
		        	this.navCtrl.pop();
		        	this.navCtrl.pop();
		        	this.presentToast();
		        }
		      }
		    ]
		  });
		  alert.present();
  }

  addClaimStore(storeId,userId,storeContact,storeEmail){
  	this.getUrl = "http://care.x-one.asia/api/json_store_add_claim?storeId=" + storeId + "&userId=" + userId + "&storeContact=" + storeContact + "&storeEmail=" + storeEmail;
		this.restProvider.getUsers(this.getUrl)
	    .then(data => {
			this.getResults = data;
			//console.log(this.getResults);
		});
  }

  presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Store Claim Submitted',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			//console.log('Dismissed toast');
		});

		toast.present();
	}

}
