import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerEditPage } from './worker-edit';

@NgModule({
  declarations: [
    WorkerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerEditPage),
  ],
})
export class WorkerEditPageModule {}
