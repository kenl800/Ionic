import { Component } from '@angular/core';
import { ModalController, MenuController, SegmentButton, App, NavParams, LoadingController } from 'ionic-angular';
import { FollowersPage } from '../followers/followers';
import { SettingsPage } from '../settings/settings';
import { ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';
import { SocialSharing } from '@ionic-native/social-sharing';

import { FacebookUserModel } from '../facebook-login/facebook-user.model';
import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
import { SearchSellerPage } from '../search-seller/search-seller';
import { SearchServicePage } from '../search-service/search-service';

import 'rxjs/Rx';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  display: string;
  profile: ProfileModel = new ProfileModel();
  user: FacebookUserModel = new FacebookUserModel();
  loading: any;
  createdCode = null;
  scannedCode:any;
  apiUrl: any;
  results: any;

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: ProfileService,
    public loadingCtrl: LoadingController,
    public socialSharing: SocialSharing,
    public facebookLoginService: FacebookLoginService,
    private barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController,
    public restProvider: RestProvider
  ) {
    this.display = "list";

    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.profileService.getData()
      .then(data => {
        this.profile.user = data.user;
        this.profile.following = data.following;
        this.profile.followers = data.followers;
        this.profile.posts = data.posts;
        this.loading.dismiss();
      });

    //added for testing -> 28th Apr 2018
    this.facebookLoginService.getFacebookUser()
    .then((user) => {
      this.user = user;

      this.apiUrl = "https://care.x-one.asia/api/social_login/" + this.user.userId;
      this.getFbUser(this.apiUrl);

      console.log(this.user);
      this.loading.dismiss();
    }, (error) => {
      console.log(error);
      this.loading.dismiss();
    });
  }

  createCode(uniqueId) {
    this.createdCode = uniqueId;
    console.log(this.createdCode);
    this.app.getRootNav().push(FollowersPage, {
      createdCode: this.createdCode
    });
  }

  getFbUser(url) {
    this.restProvider.getFbUser(url)
    .then(data => {
       this.results = data;
       this.results = Array.of(this.results);
    });
   }

  goToFollowersList() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(FollowersPage, {
      list: this.profile.followers
    });
  }

  goToFollowingList() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(FollowersPage, {
      list: this.profile.following
    });
  }

  goToSettings() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SettingsPage);
  }

  claimFormSeller(userId) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SearchSellerPage, {
      userId: userId
    });
  }

  claimFormService(userId) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SearchServicePage, {
      userId: userId
    });
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  sharePost(post) {
   //this code is to use the social sharing plugin
   // message, subject, file, url
   this.socialSharing.share(post.description, post.title, post.image)
   .then(() => {
     console.log('Success!');
   })
   .catch(() => {
      console.log('Error');
   });
  }

}
