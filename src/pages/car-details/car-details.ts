import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { Car } from '../../models/car.model';

/**
 * Generated class for the CarDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-details',
  templateUrl: 'car-details.html',
})
export class CarDetailsPage {

  key: any;
  coop: any;
  car: Car = new Car();

  constructor(private carProvider: CarProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
    this.coop = this.navParams.get('coop');

    let customPath = `cooperative/${this.coop}/car`;
    
    this.carProvider.fetch(this.key).then((data:Car)=>{
    	this.car = data;
    })
  }

}
