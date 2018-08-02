import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingClass } from '../../models/booking-class.model';
import { Cooperative } from '../../models/cooperative.model';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { BookingClassAddPage } from '../../pages/booking-class-add/booking-class-add';
import { BookingClassTypePage } from '../../pages/booking-class-type/booking-class-type';
import { BookingClassListePage } from '../booking-class-liste/booking-class-liste';

/**
 * Generated class for the BookingClassMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-class-menu',
  templateUrl: 'booking-class-menu.html',
})
export class BookingClassMenuPage {

  cooperativeKey: any;
  cooperative: Cooperative = new Cooperative();

  constructor(private bookingProvider: BookingClassProvider, private cooperativeProvider: CooperativeProvider,public navCtrl: NavController, public navParams: NavParams) {
    //this.cooperativeKey = this.navParams.get('key');
    this.cooperativeKey = 'azerty';
    this.cooperativeProvider.fetch(this.cooperativeKey).then((data: Cooperative) => {
        this.cooperative = data;
    });
  }

  ionViewDidLoad() {
  }

  addClassType(){
    this.navCtrl.push(BookingClassTypePage, {cooperativeKey: this.cooperativeKey})
  }

  listBookingClass(){
    this.navCtrl.push(BookingClassListePage, {cooperativeKey: this.cooperativeKey})
  }

  addBookingClass(){
    this.navCtrl.push(BookingClassAddPage, {cooperativeKey: this.cooperativeKey})
  }

}
