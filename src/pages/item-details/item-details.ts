import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, AppAvailability, Device } from 'ionic-native';
//import { Geolocation } from '@ionic-native/geolocation';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  id: string;
  name: string;
  address: string;
  lat: string;
  lng: string;
  url: string;

  getid: string;
  getname: string;
  getaddress: string;
  getlat: any;
  getlng: any;
  sanitizedUrl: any;
  mapurl: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer:DomSanitizer, public actionSheetCtrl: ActionSheetController) {
	   this.getid = navParams.get('id'); 
	   this.getname = navParams.get('name'); 
	   this.getaddress = navParams.get('address'); 
	   this.getlat = navParams.get('lat'); 
	   this.getlng = navParams.get('lng'); 
	   this.sanitizedUrl = this.sanitizeTheUrl(this.mapurl);
	   this.mapurl = this.sanitizeTheUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyD8eukMhKq-plpab6fStzMcBa9as_LnxG0&q=' + this.getlat + ',' + this.getlng);
  	}

  	launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string) {
		let app: string;
		app = iosSchemaName;

		AppAvailability.check(app).then(
			() => { // success callback
				let browser = new InAppBrowser(appUrl , '_system');
			},
			() => { // error callback
				let browser = new InAppBrowser(httpUrl , '_system');
			}
		);
	}

	//http://maps.apple.com/?saddr=4.415049000000001,114.01306&daddr=4.412898,113.998884&dirflg=d
	openMap(lat,lng) {
		this.launchExternalApp('maps://','','maps://','http://maps.apple.com/?saddr=Current%20Location&daddr=' + lat + ',' + lng + '&dirflg=d');
    }										// yet to change

    openWaze(lat,lng){
    	this.launchExternalApp('waze://','','waze://','https://waze.com/ul?ll=' + lat + ',' + lng + '&navigate=yes&z=10');
    }

	openActionSheet(lat,lng){
		 console.log('opening');
		 let actionsheet = this.actionSheetCtrl.create({
		 buttons:[{
			text: 'Open in Waze',
			handler: () => {
			this.openWaze(lat,lng);
		 }
		 },{
			text: 'Open in Maps',
			handler: () => {
			this.openMap(lat,lng);
		 }
		 }]
		 });
		 actionsheet.present();
	}

    sanitizeTheUrl(url){
    	return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    mapView(value){
    	if (value==1){
    		this.mapurl = this.sanitizeTheUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyD8eukMhKq-plpab6fStzMcBa9as_LnxG0&q=' + this.getlat + ',' + this.getlng);
    	}
    	if (value==2){
    		this.mapurl = this.sanitizeTheUrl('https://www.google.com/maps/embed/v1/streetview?key=AIzaSyD8eukMhKq-plpab6fStzMcBa9as_LnxG0&heading=-50&pitch=0&fov=55&location=' + this.getlat + ',' + this.getlng);
    	}
    }

/*
	openInstagram() {
		this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/');
	}

	openFacebook() {
		this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/');
	}
*/
	}

