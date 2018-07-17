import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyageParametersPage } from './voyage-parameters';

@NgModule({
  declarations: [
    VoyageParametersPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyageParametersPage),
  ],
})
export class VoyageParametersPageModule {}
