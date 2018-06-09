import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerFormPage } from './seller-form';

@NgModule({
  declarations: [
    SellerFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerFormPage),
  ],
})
export class SellerFormPageModule {}
