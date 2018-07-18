import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { Car } from '../../models/car.model';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { CarEditPage } from '../car-edit/car-edit';
import { CarListPage } from '../car-list/car-list';

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
  cartype: any;

  constructor(private carProvider: CarProvider, 
    public cartypeProvider: CarTypeProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
    this.coop = this.navParams.get('coop');

    let customPath = `cooperative/${this.coop}/car`;
    this.carProvider.customPath(customPath);

    this.cartype = {};
    
    this.carProvider.fetch(this.key).then(
      (data: Car)=>{
          this.cartypeProvider.fetch(data.type).then((cartype)=>{
            this.car = data;    
            this.cartype = cartype;     
          });
      });
  }

  editer(){
    this.navCtrl.push(CarEditPage, {key: this.key, coop: this.coop});
  }

  delete(){
      
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Voulez vous supprimer cette voiture ?',
      buttons: [
        {
          text: 'annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'supprimer',
          handler: () => {
            this.carProvider.deleteCar(this.key);
            this.navCtrl.push(CarListPage, {key: this.coop});
          }
        }
      ]
    });
    alert.present();
  }

}
