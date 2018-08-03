import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { BookingClassDetailsPage } from '../booking-class-details/booking-class-details';
import { BookingClass } from '../../models/booking-class.model';
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
  bookingClass: BookingClass;
  key: any; 

  constructor(private bookingClassProvider: BookingClassProvider, 
              public navCtrl: NavController, 
              public navParams: NavParams) {
    this.toConstruct();
  }

  ionViewWillEnter() {}

  toConstruct(){
    this.bookingClasses = [];
  
    this.cooperativeKey = this.navParams.get('cooperativeKey');
  
    let path = `cooperative/${this.cooperativeKey}/booking_class`;
  
    this.bookingClassProvider.customPath(path);
  
    this.bookingClassProvider.fetcAll().subscribe((bookingClasses)=>{
      if (bookingClasses) {
        for(let key in bookingClasses){
        bookingClasses[key].key = key;
        this.bookingClassProvider.fetch(bookingClasses[key].data).then((data)=>{
          bookingClasses[key].data = data;
        })
  
        this.bookingClasses.push(bookingClasses[key]);
      }
      }
      else{
        this.empty = true;
      }
    });
  }

  showDetails(key){
  	this.navCtrl.push(BookingClassDetailsPage, {key: key, cooperativeKey: this.cooperativeKey});
  }

}
