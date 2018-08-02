import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingClassDetailsPage } from './booking-class-details';

@NgModule({
  declarations: [
    BookingClassDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingClassDetailsPage),
  ],
})
export class BookingClassDetailsPageModule {}
