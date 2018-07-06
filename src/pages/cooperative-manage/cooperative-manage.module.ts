import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CooperativeManagePage } from './cooperative-manage';

@NgModule({
  declarations: [
    CooperativeManagePage,
  ],
  imports: [
    IonicPageModule.forChild(CooperativeManagePage),
  ],
})
export class CooperativeManagePageModule {}
