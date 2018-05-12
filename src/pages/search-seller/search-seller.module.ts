import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchSellerPage } from './search-seller';

@NgModule({
  declarations: [
    SearchSellerPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchSellerPage),
  ],
})
export class SearchSellerPageModule {}
