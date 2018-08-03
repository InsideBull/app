import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PriceTrajet } from '../../models/price-trajet';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { NotificationProvider } from '../../providers/notification/notification';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';

/**
 * Generated class for the TrajetClasseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-classe-list',
  templateUrl: 'trajet-classe-list.html',
})
export class TrajetClasseListPage {

  coop: any;
  key: any;
  classes = [];
  empty = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bookingClassProvider: BookingClassProvider, public priceTrajetProvider: PriceTrajetProvider, public notif: NotificationProvider) {
    this.coop = this.navParams.get('coop');
    this.key = this.navParams.get('key');

    let customPath = `cooperative/${this.coop}/trajet/${this.key}/price`;
    this.priceTrajetProvider.customPath(customPath);
    let pathBooking = `cooperative/${this.coop}/booking_class`;
    this.bookingClassProvider.customPath(pathBooking);
    this.priceTrajetProvider.fetcAll().subscribe((data)=>{
      if(data){
        this.classes = [];
        for(let key in data){
          data[key].key = key;
          this.bookingClassProvider.fetch(key).then((result) => {
            data[key].classe = result;
          })
          this.classes.push(data[key]);
        }
        }else{
          this.empty = true;
        }
    });
  }

  ionViewDidLoad() {
  }

  delete(key){
    let message = "Voulez-vous supprimer cette classe sur ce trajet";
     let title = "Suppression";
     this.notif.presentConfirm(message, title).then((confirm)=>{
       this.priceTrajetProvider.deletePriceTrajet(key);
       this.navCtrl.push(TrajetClasseListPage, {key: this.key, coop: this.coop});
     },()=>{});
  }

}
