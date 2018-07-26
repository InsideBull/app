import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerListPage } from './worker-list';

@NgModule({
  declarations: [
    WorkerListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerListPage),
  ],
})
export class WorkerListPageModule {}
