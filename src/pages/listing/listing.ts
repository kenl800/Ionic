import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import { ListingModel } from './listing.model';
import { ListingService } from './listing.service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
import { ActivationPage } from '../activation/activation';

@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
export class ListingPage {
  listing: ListingModel = new ListingModel();
  loading: any;
  scanStatus: any;
  results: any;
  results2: any;
  scannedCode: any;
  codeStart: any;
  codeEnd: any;
  passStart: any;
  passEnd: any;
  finalCode: any;
  finalPass: any;
  url: any;


  constructor(
    public nav: NavController,
    public listingService: ListingService,
    public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    public restProvider: RestProvider
  ) {
    this.loading = this.loadingCtrl.create();
  }


  ionViewDidLoad() {
    this.loading.present();
    this.listingService
      .getData()
      .then(data => {
        this.listing.banner_image = data.banner_image;
        this.listing.banner_title = data.banner_title;
        this.listing.populars = data.populars;
        this.listing.categories = data.categories;
        this.loading.dismiss();
      });
  }


  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    this.nav.push(FeedPage, { category: category });
  }

  scanCode() {
    this.scanStatus = true;
    this.results = null;
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;

      if (this.scannedCode.indexOf("pass=") >= 1){
        this.codeStart = this.scannedCode.indexOf("code=") + 5;
        this.codeEnd = this.scannedCode.indexOf("&pass=");
        this.passStart = this.codeEnd + 6;
        this.passEnd = this.scannedCode.length;
        
        this.finalCode = this.scannedCode.substring(this.codeStart,this.codeEnd);
        this.finalPass = this.scannedCode.substring(this.passStart,this.passEnd);
        this.url = "http://care.x-one.asia/api/json_qr_details?code="+ this.finalCode + "&pass=" + this.finalPass;
        this.getProduct(this.url);
        this.scanStatus = true;
      }
      else{
        this.scanStatus = false;
      }
      
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  getProduct(url) {
    this.restProvider.getProduct(url)
    .then(data => {
      this.results = data;
      this.results = Array.of(this.results);
      this.nav.push(ActivationPage, { results: this.results, serialCode: this.finalCode , serialPass: this.finalPass });
    });
  }

  getProduct2(url) {
    this.restProvider.getProduct(url)
    .then(data => {
      this.results = data;
      this.results = Array.of(this.results);
      console.log(this.results)
    });
  }

  activateProduct(nric){
    this.productUrl = "https://care.x-one.asia/api/try_submit?nric=" + nric + "&age=19";
    this.restProvider.getProduct(this.productUrl)
    .then(data => {
      this.results = data;
      this.results = Array.of(this.results);
      console.log(nric);
      console.log(this.results);
    });
  }

}
