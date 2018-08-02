import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajetEditPage } from './trajet-edit';

@NgModule({
  declarations: [
    TrajetEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TrajetEditPage),
  ],
})
export class TrajetEditPageModule {}
