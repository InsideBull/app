import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationManagePage } from './station-manage';

@NgModule({
  declarations: [
    StationManagePage,
  ],
  imports: [
    IonicPageModule.forChild(StationManagePage),
  ],
})
export class StationManagePageModule {}
