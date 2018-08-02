import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingClassMenuPage } from './booking-class-menu';

@NgModule({
  declarations: [
    BookingClassMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingClassMenuPage),
  ],
})
export class BookingClassMenuPageModule {}
