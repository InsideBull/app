import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerAddPage } from './worker-add';

@NgModule({
  declarations: [
    WorkerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerAddPage),
  ],
})
export class WorkerAddPageModule {}
