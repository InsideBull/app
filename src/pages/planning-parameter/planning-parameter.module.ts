import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningParameterPage } from './planning-parameter';

@NgModule({
  declarations: [
    PlanningParameterPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningParameterPage),
  ],
})
export class PlanningParameterPageModule {}
