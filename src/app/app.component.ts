import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';
import { OneSignal } from '@ionic-native/onesignal';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { HistoryPage } from '../pages/history/history';
import { LayoutsPage } from '../pages/layouts/layouts';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { FunctionalitiesPage } from '../pages/functionalities/functionalities';
import { FirebaseLoginPage } from '../pages/firebase-integration/firebase-login/firebase-login';
import { WordpressMenuPage } from '../pages/wordpress-integration/wordpress-menu/wordpress-menu';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LoginPage } from '../pages/login/login';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  rootPage: any = LoginPage;
  // rootPage: any = TabsNavigationPage;
  textDir: string = "ltr";

  pages: Array<{title: any, icon: string, component: any}>;
  pushPages: Array<{title: any, icon: string, component: any}>;

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public translate: TranslateService,
    public toastCtrl: ToastController,
    private oneSignal: OneSignal
  ) {
    translate.setDefaultLang('en');
    translate.use('en');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();

        this.oneSignal.startInit('c8dfa276-1300-4be7-a83f-aafd4a028bd8');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        
        this.oneSignal.handleNotificationReceived().subscribe(() => {

        });
        
        this.oneSignal.handleNotificationOpened().subscribe(() => {

        });
        this.oneSignal.endInit();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
        if(event.lang == 'ar')
        {
          platform.setDir('rtl', true);
        }
        else
        {
          platform.setDir('ltr', true);
        }
        Observable.forkJoin(
          this.translate.get('Dashboard'),
          this.translate.get('History'),
          this.translate.get('Store Locator'),
          this.translate.get('My Profile'),
          //this.translate.get('SETTINGS'),
          //this.translate.get('WORDPRESS_INTEGRATION'),
          //this.translate.get('FIREBASE_INTEGRATION')
        ).subscribe(data => {
          this.pages = [
            { title: data[0], icon: 'home', component: TabsNavigationPage },
            { title: data[1], icon: 'ios-clock-outline', component: HistoryPage },
            { title: data[2], icon: 'pin', component: FunctionalitiesPage },
          ];

          this.pushPages = [
            //{ title: data[3], icon: 'grid', component: LayoutsPage },
            { title: data[3], icon: 'person', component: SettingsPage },
            //{ title: data[5], icon: 'logo-wordpress', component: WordpressMenuPage },
            //{ title: data[6], icon: 'flame', component: FirebaseLoginPage }
          ];

        });
    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }
}
