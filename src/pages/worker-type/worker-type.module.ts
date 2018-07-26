import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerTypePage } from './worker-type';

@NgModule({
  declarations: [
    WorkerTypePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerTypePage),
  ],
})
export class WorkerTypePageModule {}
