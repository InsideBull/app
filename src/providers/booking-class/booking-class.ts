import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { BookingClass } from '../../models/booking-class.model';
import { LoadingController } from 'ionic-angular';


/*
  Generated class for the BookingClassProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingClassProvider extends FirebaseProvider {

  protected __path = 'booking_class';
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(booking: BookingClass, key ?: string){
  	if (key) {
  		return this.push(booking,key);
  	}
  	else{
  		return this.push(booking);
  	}
  }

  customPath(path:string){
    this.setPath(path)
  }

  fetch(key: string){
    return this.getOneById(key);
  }

  fetcAll(){
    return this.getAll();
  }


  deleteBookingClass(i: string){
    this.delete(i);
  }

}
