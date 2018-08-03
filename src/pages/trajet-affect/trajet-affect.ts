import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { PriceTrajet } from '../../models/price-trajet';
import { TrajetClasseListPage } from '../trajet-classe-list/trajet-classe-list';

/**
 * Generated class for the TrajetAffectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-affect',
  templateUrl: 'trajet-affect.html',
})
export class TrajetAffectPage {

  coop: any;
  key: any;
  classes = [];
  priceClasse: PriceTrajet = new PriceTrajet();

  constructor(public navCtrl: NavController, public navParams: NavParams,public bookingClassProvider: BookingClassProvider, public priceTrajetProvider: PriceTrajetProvider) {
    this.coop = this.navParams.get('coop');
    this.key = this.navParams.get('key');

    let customPath = `cooperative/${this.coop}/trajet/${this.key}/price`;
    this.priceTrajetProvider.customPath(customPath);

    this.bookingClassProvider.fetcAll().subscribe((classes)=>{
      for(let key in classes){
        classes[key].key = key;
        this.priceTrajetProvider.fetch(key).then((data)=>{
          if(!data){
            this.classes.push(classes[key]);
          }
        });
      }
    })

    
  }

  ionViewDidLoad() { 
    
  }

  save(){
    this.priceTrajetProvider.save(this.priceClasse.price, this.priceClasse.classe);
    this.navCtrl.setRoot(TrajetClasseListPage, {key:this.key, coop: this.coop});
  }



}
