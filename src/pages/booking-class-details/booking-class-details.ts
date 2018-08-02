import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { BookingClass } from '../../models/booking-class.model';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { BookingClassListePage } from '../../pages/booking-class-liste/booking-class-liste';
import { BookingClassEditPage } from '../../pages/booking-class-edit/booking-class-edit';

/**
 * Generated class for the BookingClassDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-class-details',
  templateUrl: 'booking-class-details.html',
})
export class BookingClassDetailsPage {

  key: any;
  cooperativeKey: any;
  bookingClass: BookingClass = new BookingClass();

  constructor(private notif: NotificationProvider,private bookingClassProvider: BookingClassProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.toConstruct();
  }

  ionViewDidLoad() {
  }

  toConstruct(){
    this.key = this.navParams.get('key');
    this.cooperativeKey = this.navParams.get('cooperativeKey');
  
    let customPath = `cooperative/${this.cooperativeKey}/bookingClass`;
  
    this.bookingClassProvider.customPath(customPath);
  
    this.bookingClassProvider.fetch(this.key).then((bookingClass: BookingClass)=>{
    this.bookingClass = bookingClass;
      
    });

  }

  editer(){
    this.navCtrl.push(BookingClassEditPage, {key: this.key, cooperativeKey: this.cooperativeKey});
  }

  delete(){
    this.notif.presentConfirm().then((confirm)=>{
      this.bookingClassProvider.deleteBookingClass(this.key);
      this.navCtrl.push(BookingClassListePage, {cooperativeKey: this.cooperativeKey});
    },
    ()=>{});
  }

}
