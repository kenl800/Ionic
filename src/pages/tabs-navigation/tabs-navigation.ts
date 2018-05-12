import { Component } from '@angular/core';

import { ListingPage } from '../listing/listing';
import { ProfilePage } from '../profile/profile';
import { HistoryPage } from '../history/history';
import { FunctionalitiesPage } from '../../pages/functionalities/functionalities';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

  constructor() {
    this.tab1Root = ListingPage;
    this.tab2Root = ProfilePage;
    this.tab3Root = HistoryPage;
    this.tab4Root = FunctionalitiesPage;
  }
}
