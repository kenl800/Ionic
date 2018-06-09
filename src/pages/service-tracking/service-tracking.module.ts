import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceTrackingPage } from './service-tracking';

@NgModule({
  declarations: [
    ServiceTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceTrackingPage),
  ],
})
export class ServiceTrackingPageModule {}
