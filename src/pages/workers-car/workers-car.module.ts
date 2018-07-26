import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkersCarPage } from './workers-car';

@NgModule({
  declarations: [
    WorkersCarPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkersCarPage),
  ],
})
export class WorkersCarPageModule {}
