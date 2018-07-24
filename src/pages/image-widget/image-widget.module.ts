import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageWidgetPage } from './image-widget';

@NgModule({
  declarations: [
    ImageWidgetPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageWidgetPage),
  ],
})
export class ImageWidgetPageModule {}
