import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyageMenuPage } from './voyage-menu';

@NgModule({
  declarations: [
    VoyageMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyageMenuPage),
  ],
})
export class VoyageMenuPageModule {}
