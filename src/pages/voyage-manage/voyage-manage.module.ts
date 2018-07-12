import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyageManagePage } from './voyage-manage';

@NgModule({
  declarations: [
    VoyageManagePage,
  ],
  imports: [
    IonicPageModule.forChild(VoyageManagePage),
  ],
})
export class VoyageManagePageModule {}
