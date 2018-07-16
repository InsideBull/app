import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationListPage } from './station-list';

@NgModule({
  declarations: [
    StationListPage,
  ],
  imports: [
    IonicPageModule.forChild(StationListPage),
  ],
})
export class StationListPageModule {}
