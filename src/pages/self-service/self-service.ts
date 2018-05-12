import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SelfServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-self-service',
  templateUrl: 'self-service.html',
})
export class SelfServicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelfServicePage');
  }

  dismiss() {
    this.view.dismiss();
  }
}
