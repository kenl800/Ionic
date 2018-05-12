import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, ModalController, Tabs} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { FunctionalitiesPage } from '../functionalities/functionalities';
import { SelfServicePage } from '../self-service/self-service';

/**
 * Generated class for the HistoryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-history-details',
	templateUrl: 'history-details.html',
})
export class HistoryDetailsPage {
	

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public menu: MenuController, 
		public app: App, 
		public actionSheetCtrl: ActionSheetController,
		public modal: ModalController,
		public tabs: Tabs
		) {
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad HistoryDetailsPage');
	}

	openActionSheet(){
	 let actionsheet = this.actionSheetCtrl.create({
	 buttons:[{
		text: 'Self-Service',
		handler: () => {
		this.openSelfService();
	 }
	 },{
		text: 'Store-Nearby',
		handler: () => {
		//this.openMap(lat,lng);
		this.openStoreLocator();
	 }
	 }]
	 });
	 actionsheet.present();
	}

	openSelfService(){
	    let modal = this.modal.create(SelfServicePage);
	    modal.present();
	}

	openStoreLocator() {
		
	}

}
