import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'terms-of-service-page',
  templateUrl: 'terms-of-service.html'
})

export class TermsOfServicePage {

  tncurl: any;

  constructor(public view: ViewController) {
  	this.tncurl = "https://care.x-one.asia/api/json_tnc_page";
  }

  dismiss() {
    this.view.dismiss();
  }
}
