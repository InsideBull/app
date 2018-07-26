import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkersCarAddPage } from './workers-car-add';

@NgModule({
  declarations: [
    WorkersCarAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkersCarAddPage),
  ],
})
export class WorkersCarAddPageModule {}
