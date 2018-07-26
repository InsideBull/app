import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkersCarListPage } from './workers-car-list';

@NgModule({
  declarations: [
    WorkersCarListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkersCarListPage),
  ],
})
export class WorkersCarListPageModule {}
