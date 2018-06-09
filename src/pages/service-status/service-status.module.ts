import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceStatusPage } from './service-status';

@NgModule({
  declarations: [
    ServiceStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceStatusPage),
  ],
})
export class ServiceStatusPageModule {}
