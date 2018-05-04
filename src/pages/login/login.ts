import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { GoogleLoginService } from '../google-login/google-login.service';
import { TwitterLoginService } from '../twitter-login/twitter-login.service';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  fburl: any;
  results: any;
  results2: any;
  user: any;
  tempurl: any;


  constructor(
    public nav: NavController,
    public facebookLoginService: FacebookLoginService,
    public googleLoginService: GoogleLoginService,
    public twitterLoginService: TwitterLoginService,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('test', Validators.required)
    });
  }

  doLogin(){
    this.nav.setRoot(this.main_page.component);
  }

  doFacebookLogin() {
    this.loading = this.loadingCtrl.create();
    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    // let this = this;

    this.facebookLoginService.getFacebookUser()
    .then((data) => {
       // user is previously logged with FB and we have his data we will let him access the app
      this.nav.setRoot(this.main_page.component);
    }, (error) => {
      //we don't have the user data so we will ask him to log in
      this.facebookLoginService.doFacebookLogin()
      .then((res) => {
        this.loading.dismiss();
        this.nav.setRoot(this.main_page.component);
        this.facebookLoginService.getFacebookUser()
        .then((user) => {
          this.user = user;
          this.fburl = "https://care.x-one.asia/api/social_login/" + user.userId;
          this.getFbUser(this.fburl);

          if (this.results = "false"){
            //if false means id does not exist, create new account
            this.registerFB(user.userId,user.name,user.email); 
          }
          
          this.loginSession(user.userId); 
          // Temporary
          this.tempurl = "https://care.x-one.asia/api/json_session";
          this.getFbUser2(this.tempurl);
          //
          this.loading.dismiss();
        }, (error) => {
          console.log(error);
          this.loading.dismiss();
        });
      }, (err) => {
        console.log("Facebook Login error", err);
      });
    });
  }

  //Try social_login using the obtained id
  getFbUser(url) {
      this.restProvider.getFbUser(url)
      .then(data => {
         this.results = data;
         this.results = Array.of(this.results);
         console.log(this.results);
      });
   }

   getFbUser2(url) {
      this.restProvider.getFbUser2(url)
      .then(data => {
         this.results = data;
         this.results = Array.of(this.results);
         console.log(this.results);
      });
   }

  // If social_login id existed, proceed to login api
  loginSession(id){
      this.fburl = "https://care.x-one.asia/api/social_login/" + id;
      console.log(this.fburl);
      this.restProvider.registerFB(this.fburl)
      .then(data => {
         this.results2 = data;
         this.results2 = Array.of(this.results);
      });
   }

   //If social_login id does not exist, proceed to register api
   registerFB(id,fullname,email){
        this.fburl = "https://care.x-one.asia/api/social_register/?identifier=" + id + "&display_name=" + fullname + "&email=" + email;
        console.log(this.fburl);
        this.restProvider.registerFB(this.fburl)
        .then(data => {
           this.results2 = data;
           this.results2 = Array.of(this.results);
        });
   }

  doGoogleLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app

    this.googleLoginService.trySilentLogin()
    .then((data) => {
       // user is previously logged with Google and we have his data we will let him access the app
      this.nav.setRoot(this.main_page.component);
    }, (error) => {
      //we don't have the user data so we will ask him to log in
      this.googleLoginService.doGoogleLogin()
      .then((res) => {
        this.loading.dismiss();
        this.nav.setRoot(this.main_page.component);
      }, (err) => {
        console.log("Google Login error", err);
      });
    });
  }

  doTwitterLogin(){
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app

    this.twitterLoginService.getTwitterUser()
    .then((data) => {
       // user is previously logged with FB and we have his data we will let him access the app
      this.nav.setRoot(this.main_page.component);
    }, (error) => {
      //we don't have the user data so we will ask him to log in
      this.twitterLoginService.doTwitterLogin()
      .then((res) => {
        this.loading.dismiss();
        this.nav.setRoot(this.main_page.component);
      }, (err) => {
        console.log("Twitter Login error", err);
      });
    });
  }

  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

}
