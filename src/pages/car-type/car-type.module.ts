import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarTypePage } from './car-type';

@NgModule({
  declarations: [
    CarTypePage,
  ],
  imports: [
    IonicPageModule.forChild(CarTypePage),
  ],
})
export class CarTypePageModule {}
