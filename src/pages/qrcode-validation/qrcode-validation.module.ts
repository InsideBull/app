import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodeValidationPage } from './qrcode-validation';

@NgModule({
  declarations: [
    QrcodeValidationPage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodeValidationPage),
  ],
})
export class QrcodeValidationPageModule {}
