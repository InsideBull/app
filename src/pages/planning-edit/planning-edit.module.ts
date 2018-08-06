import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningEditPage } from './planning-edit';

@NgModule({
  declarations: [
    PlanningEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningEditPage),
  ],
})
export class PlanningEditPageModule {}
