import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { CarDetailsPage } from '../car-details/car-details';

/**
 * Generated class for the CarListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-list',
  templateUrl: 'car-list.html',
})
export class CarListPage {
  param: string;
  cars: any;
  cartypes: any;
  private loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carProvider: CarProvider,
    public cartypeProvider: CarTypeProvider,
    private loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.param = this.navParams.get('key');
    this.cars = [];
    let customPath = `cooperative/${this.param}/car`;
    this.carProvider.customPath(customPath);
    this.carProvider.fetcAll().subscribe(
      (data)=>{
        for(let key in data){
          data[key].key = key;
          this.cartypeProvider.fetch(data[key].type).then((cartype)=>{
            data[key].cartype = cartype;
            this.cars.push(data[key]);
            
          });
        }
      });
    this.loading.dismiss();
  }

  goToDetail(i: string){
    this.navCtrl.push(CarDetailsPage, {key: i, coop: this.param});
  }

}
