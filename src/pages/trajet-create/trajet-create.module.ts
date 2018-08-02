import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajetCreatePage } from './trajet-create';

@NgModule({
  declarations: [
    TrajetCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TrajetCreatePage),
  ],
})
export class TrajetCreatePageModule {}
