import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingClassEditPage } from './booking-class-edit';

@NgModule({
  declarations: [
    BookingClassEditPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingClassEditPage),
  ],
})
export class BookingClassEditPageModule {}
