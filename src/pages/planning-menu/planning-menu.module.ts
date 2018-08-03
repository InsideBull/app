import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningMenuPage } from './planning-menu';

@NgModule({
  declarations: [
    PlanningMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningMenuPage),
  ],
})
export class PlanningMenuPageModule {}
