import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingClassTypePage } from './booking-class-type';

@NgModule({
  declarations: [
    BookingClassTypePage,
  ],
  imports: [
    IonicPageModule.forChild(BookingClassTypePage),
  ],
})
export class BookingClassTypePageModule {}
