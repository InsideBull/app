import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyageCreatePage } from './voyage-create';

@NgModule({
  declarations: [
    VoyageCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(VoyageCreatePage),
  ],
})
export class VoyageCreatePageModule {}
