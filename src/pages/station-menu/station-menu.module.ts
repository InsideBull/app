import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationMenuPage } from './station-menu';

@NgModule({
  declarations: [
    StationMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(StationMenuPage),
  ],
})
export class StationMenuPageModule {}
