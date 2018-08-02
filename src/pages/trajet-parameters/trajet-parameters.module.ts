import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajetParametersPage } from './trajet-parameters';

@NgModule({
  declarations: [
    TrajetParametersPage,
  ],
  imports: [
    IonicPageModule.forChild(TrajetParametersPage),
  ],
})
export class TrajetParametersPageModule {}
