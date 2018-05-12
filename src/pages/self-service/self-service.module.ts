import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfServicePage } from './self-service';

@NgModule({
  declarations: [
    SelfServicePage,
  ],
  imports: [
    IonicPageModule.forChild(SelfServicePage),
  ],
})
export class SelfServicePageModule {}
