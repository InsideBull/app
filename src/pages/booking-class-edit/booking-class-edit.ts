import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BookingClass } from '../../models/booking-class.model';
import { NotificationProvider } from '../../providers/notification/notification';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { BookingClassDetailsPage } from '../../pages/booking-class-details/booking-class-details';
/**
 * Generated class for the BookingClassEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-class-edit',
  templateUrl: 'booking-class-edit.html',
})
export class BookingClassEditPage {

  form: FormGroup;
  key: any; 
  cooperativeKey: any;
  bookingClasses: any;
  bookingClass: BookingClass;

  constructor(private bookingClassProvider: BookingClassProvider, public navCtrl: NavController, public navParams: NavParams,
  public formBuilder: FormBuilder, public notif: NotificationProvider) {
    this.form = this.formBuilder.group({
      type: ['',Validators.required],			
      description: ['',Validators.required]
    });
    this.toConstruct();
  }

  toConstruct(){
    this.key = this.navParams.get('key');
    this.cooperativeKey = this.navParams.get('cooperativeKey');
    
    this.bookingClasses = [];
    this.bookingClassProvider.fetcAll().subscribe((bookingClasses)=>{
  
      for(let key in bookingClasses){
        bookingClasses[key].key = key;
         this.bookingClasses.push(bookingClasses[key]);
      }
    });
  
    this.bookingClass = new BookingClass();
    let customPath = `cooperative/${this.cooperativeKey}/booking_class`;
    this.bookingClassProvider.customPath(customPath);
    this.bookingClassProvider.fetch(this.key).then((bookingClass: BookingClass)=>{
      this.bookingClass = bookingClass;
    });

  }

  onSubmit(){
    let message = "Voulez vous vraimment modifier la classe " + this.form.value.type;
    let title = "Editer classe"
   this.notif.presentConfirm(message, title).then(
     (confirm)=>{
       let value = this.form.value;
       let bookingClass = new BookingClass(value);
       let customPath = `cooperative/${this.cooperativeKey}/booking_class`;
       this.bookingClassProvider.customPath(customPath);
       this.bookingClassProvider.save(bookingClass, this.key);
       this.navCtrl.setRoot(BookingClassDetailsPage, {key: this.key, cooperativeKey: this.cooperativeKey});
     },
     ()=>{});	
    
  }

}
