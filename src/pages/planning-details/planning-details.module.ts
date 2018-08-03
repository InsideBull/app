import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningDetailsPage } from './planning-details';

@NgModule({
  declarations: [
    PlanningDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningDetailsPage),
  ],
})
export class PlanningDetailsPageModule {}
