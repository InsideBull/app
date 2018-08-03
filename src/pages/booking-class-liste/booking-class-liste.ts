import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { BookingClassDetailsPage } from '../booking-class-details/booking-class-details';

/**
 * Generated class for the BookingClassListePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-class-liste',
  templateUrl: 'booking-class-liste.html',
})
export class BookingClassListePage {

  bookingClasses: any;
  cooperativeKey: any;
  empty = false;
  constructor(private bookingClassProvider: BookingClassProvider, 
              public navCtrl: NavController, 
              public navParams: NavParams) {
    this.toConstruct();
  }

  ionViewWillEnter() {}

  toConstruct(){
  }

  showDetails(key){
  	this.navCtrl.push(BookingClassDetailsPage, {key: key, cooperativeKey: this.cooperativeKey});
  }

}
