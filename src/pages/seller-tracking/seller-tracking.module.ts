import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerTrackingPage } from './seller-tracking';

@NgModule({
  declarations: [
    SellerTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerTrackingPage),
  ],
})
export class SellerTrackingPageModule {}
