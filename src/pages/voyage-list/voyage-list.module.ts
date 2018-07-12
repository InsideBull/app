import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyageListPage } from './voyage-list';

@NgModule({
  declarations: [
    VoyageListPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyageListPage),
  ],
})
export class VoyageListPageModule {}
