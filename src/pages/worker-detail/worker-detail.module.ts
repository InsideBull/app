import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerDetailPage } from './worker-detail';

@NgModule({
  declarations: [
    WorkerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerDetailPage),
  ],
})
export class WorkerDetailPageModule {}
