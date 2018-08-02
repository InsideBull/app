import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingClassAddPage } from './booking-class-add';

@NgModule({
  declarations: [
    BookingClassAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingClassAddPage),
  ],
})
export class BookingClassAddPageModule {}
