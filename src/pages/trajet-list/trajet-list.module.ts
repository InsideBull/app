import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajetListPage } from './trajet-list';

@NgModule({
  declarations: [
    TrajetListPage,
  ],
  imports: [
    IonicPageModule.forChild(TrajetListPage),
  ],
})
export class TrajetListPageModule {}
