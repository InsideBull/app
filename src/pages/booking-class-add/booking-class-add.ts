import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Cooperative } from '../../models/cooperative.model';
import { Platform } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { BookingClass } from '../../models/booking-class.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';

import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { BookingClassDetailsPage } from '../booking-class-details/booking-class-details';

/**
 * Generated class for the BookingClassAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-class-add',
  templateUrl: 'booking-class-add.html',
})
export class BookingClassAddPage {

  form: FormGroup;
  cooperativeKey: any
  bookingClasstypes: any;
  cooperative: Cooperative = new Cooperative();

  constructor(private cooperativeProvider: CooperativeProvider, private bookingClassProvider: BookingClassProvider, public notif: NotificationProvider, public platform:Platform, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public alertCtrl: AlertController) {
    this.form = this.formBuilder.group({	
      type: ['',Validators.required],	
      description: ['', Validators.required]	

    });
    this.toConstruct();
  }


  ionViewDidLoad() {
  }

  toConstruct(){
    this.cooperativeKey = this.navParams.get('cooperativeKey');
    
    this.cooperativeProvider.fetch(this.cooperativeKey).then(
      (data: Cooperative) => { 
        this.cooperative = data;
      });
  
      this.bookingClasstypes = [];
   }

   onSubmit(){
    let message = "Voulez vous vraimment ajouter!";
    let title = "Ajout"
   this.notif.presentConfirm(message, title).then(
     (confirm)=>{
       let value = this.form.value;
       let book = new BookingClass(value);
       let customPath = `cooperative/${this.cooperativeKey}/booking_class`;
       this.bookingClassProvider.customPath(customPath);
       let key = this.bookingClassProvider.save(book);
       this.navCtrl.setRoot(BookingClassDetailsPage, {key: key, cooperativeKey: this.cooperativeKey});
     },
     ()=>{});	
    
  }

}
