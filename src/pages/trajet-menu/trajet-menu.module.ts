import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajetMenuPage } from './trajet-menu';

@NgModule({
  declarations: [
    TrajetMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(TrajetMenuPage),
  ],
})
export class TrajetMenuPageModule {}
