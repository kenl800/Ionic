import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsPage } from '../maps/maps';
import { FacebookLoginPage } from '../facebook-login/facebook-login';
import { GoogleLoginPage } from '../google-login/google-login';
import { TwitterLoginPage } from '../twitter-login/twitter-login';
import { ContactCardPage } from '../contact-card/contact-card';
import { AdsPage } from '../ads/ads';
import { VideoPlaylistPage } from '../video-playlist/video-playlist';

import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

import { ItemDetailsPage } from '../item-details/item-details';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'functionalities-page',
  templateUrl: 'functionalities.html'
})
export class FunctionalitiesPage {
  items: Array<{title: string, note?: string, component: any}>;
  userLat: any;
  userLng: any;
  parseUrl: string;
  R: any;
  dLat: any;
  dLon: any;
  a: any;
  c: any;
  d: any;


  constructor(public restProvider: RestProvider,public navCtrl: NavController,private geolocation: Geolocation){
      this.getUserLocation();
      
    }

  results: any;

  getUserLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLat = resp.coords.latitude;
      this.userLng = resp.coords.longitude;
      //for spoofing
      this.userLat = 3.0721; this.userLng = 101.6069;
      this.getUsers(this.userLat,this.userLng);
    });
  }

  getUsers(lat,lng) {
    this.parseUrl = 'https://care.x-one.asia/api/json_location_list?lat=' + lat + '&lon=' + lng;
    this.restProvider.getUsers(this.parseUrl)
    .then(data => {
      this.results = data;
      console.log(this.results);
    });
  }

  itemTapped(result: any) {
    this.navCtrl.push(ItemDetailsPage, 
      {
        id: result.id,
        name: result.name,
        address: result.address,
        lat: result.lat,
        lng: result.lng
      });
  }


//Harvesine Formula -> Not accurate? Different from Google Maps Distance
  getDistance(userLat,userLng,placeLat,placeLng){
    this.R = 6371; // Radius of the earth in km
    this.dLat = this.deg2rad(placeLat-userLat);  // deg2rad below
    this.dLon = this.deg2rad(placeLng-userLng); 
    this.a = Math.sin(this.dLat/2) * Math.sin(this.dLat/2) + Math.cos(this.deg2rad(userLat)) * Math.cos(this.deg2rad(placeLat)) * Math.sin(this.dLon/2) * Math.sin(this.dLon/2); 
    this.c = 2 * Math.atan2(Math.sqrt(this.a), Math.sqrt(1-this.a)); 
    this.d = this.R * this.c; // Distance in km
    return Number((this.d).toFixed(2));
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}