import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivationFormPage } from './activation-form';

@NgModule({
  declarations: [
    ActivationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivationFormPage),
  ],
})
export class ActivationFormPageModule {}
