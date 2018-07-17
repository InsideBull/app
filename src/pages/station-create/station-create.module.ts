import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationCreatePage } from './station-create';

@NgModule({
  declarations: [
    StationCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(StationCreatePage),
  ],
})
export class StationCreatePageModule {}
