import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarMenuPage } from './car-menu';

@NgModule({
  declarations: [
    CarMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CarMenuPage),
  ],
})
export class CarMenuPageModule {}
