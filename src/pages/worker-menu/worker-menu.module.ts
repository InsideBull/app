import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerMenuPage } from './worker-menu';

@NgModule({
  declarations: [
    WorkerMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerMenuPage),
  ],
})
export class WorkerMenuPageModule {}
