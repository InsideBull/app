import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningCreatePage } from './planning-create';

@NgModule({
  declarations: [
    PlanningCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningCreatePage),
  ],
})
export class PlanningCreatePageModule {}
