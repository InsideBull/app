import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CooperativeListPage } from './cooperative-list';

@NgModule({
  declarations: [
    CooperativeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CooperativeListPage),
  ],
})
export class CooperativeListPageModule {}
