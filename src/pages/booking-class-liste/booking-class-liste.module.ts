import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingClassListePage } from './booking-class-liste';

@NgModule({
  declarations: [
    BookingClassListePage,
  ],
  imports: [
    IonicPageModule.forChild(BookingClassListePage),
  ],
})
export class BookingClassListePageModule {}
