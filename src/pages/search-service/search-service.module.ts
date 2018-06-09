import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchServicePage } from './search-service';

@NgModule({
  declarations: [
    SearchServicePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchServicePage),
  ],
})
export class SearchServicePageModule {}
