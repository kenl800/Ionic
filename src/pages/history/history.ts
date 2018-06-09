import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryDetailsPage } from '../history-details/history-details';
import { ClaimDetailsPage } from '../claim-details/claim-details';
import { RestProvider } from '../../providers/rest/rest';
import { SearchSellerPage } from '../search-seller/search-seller';
import { FacebookUserModel } from '../facebook-login/facebook-user.model';
import { FacebookLoginService } from '../facebook-login/facebook-login.service';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  	user: FacebookUserModel = new FacebookUserModel();
	section: String;
	claimUrl: any;
	claimUrl2: any;
	results: any;
	groups: any;
	persons: any;
	obtainedResult: any;
	results_users: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,public facebookLoginService: FacebookLoginService) {
		this.doRefresh(0);
		this.doRefresh2(0);
		this.section = "purchase";
	}

	ionViewDidLoad() {
		this.claimUrl = "http://care.x-one.asia/api/json_claim_list";
    	this.restProvider.getUsers(this.claimUrl)
	    .then(data => {
	      this.results = data;
	      //this.results = Array.of(this.results);
	    });

	    this.claimUrl2 = "http://care.x-one.asia/api/json_claim_grouplist";
    	this.restProvider.getUsers(this.claimUrl2)
	    .then(data => {
	      this.groups = data;
	      //this.results = Array.of(this.results);
	    });

	    //9/6/18 -> Facebook Login to get user id for filtering (Incomplete)
	    this.facebookLoginService.getFacebookUser()
	    .then((user) => {
	      this.user = user;

	      this.apiUrl = "https://care.x-one.asia/api/social_login/" + this.user.userId;
	      this.restProvider.getFbUser(this.apiUrl)
		      .then(data => {
		         this.results_users = data;
		         this.results_users = Array.of(this.results_users);
		         console.log(this.results_users);
		      });
	      this.loading.dismiss();
	    }, (error) => {
	      console.log(error);
	      this.loading.dismiss();
	    });
	}



	purchaseItem(result) {
		this.navCtrl.push(HistoryDetailsPage, 
		{

		});
	}

	claimItem(result) {
		this.navCtrl.push(ClaimDetailsPage, 
		{
			obtainedResult: result
		});
	}

	AddClaim(){
		this.navCtrl.push(SearchSellerPage, 
		{

		});
	}

	doRefresh(refresher){
		this.claimUrl = "http://care.x-one.asia/api/json_claim_list";
    	this.restProvider.getUsers(this.claimUrl)
	    .then(data => {
	      this.results = data;
	      //this.results = Array.of(this.results);
	    });

	    if (refresher != 0){
	    	setTimeout(() => {
		      refresher.complete();
		    }, 1000);
	    }
	}

	doRefresh2(refresher){
		this.claimUrl = "http://care.x-one.asia/api/json_claim_grouplist";
    	this.restProvider.getUsers(this.claimUrl)
	    .then(data => {
	      this.groups = data;
	      //this.results = Array.of(this.results);
	    });

	    if (refresher != 0){
	    	setTimeout(() => {
		      refresher.complete();
		    }, 1000);
	    }
	}


}
