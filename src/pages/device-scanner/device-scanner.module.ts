import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceScannerPage } from './device-scanner';

@NgModule({
  declarations: [
    DeviceScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceScannerPage),
  ],
})
export class DeviceScannerPageModule {}
