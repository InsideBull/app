import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarAddPage } from './car-add';

@NgModule({
  declarations: [
    CarAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CarAddPage),
  ],
})
export class CarAddPageModule {}
