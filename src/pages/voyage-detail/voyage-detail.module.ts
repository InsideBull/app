import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyageDetailPage } from './voyage-detail';

@NgModule({
  declarations: [
    VoyageDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyageDetailPage),
  ],
})
export class VoyageDetailPageModule {}
