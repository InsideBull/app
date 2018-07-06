import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CooperativeDetailsPage } from './cooperative-details';

@NgModule({
  declarations: [
    CooperativeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CooperativeDetailsPage),
  ],
})
export class CooperativeDetailsPageModule {}
