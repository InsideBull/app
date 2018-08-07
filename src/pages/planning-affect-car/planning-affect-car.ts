import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanningProvider } from '../../providers/planning/planning';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { CarProvider } from '../../providers/car/car';
import { NotificationProvider } from '../../providers/notification/notification';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { Planning } from '../../models/planning.model';
import { PlanningAffectCarListPage } from '../planning-affect-car-list/planning-affect-car-list';

/**
 * Generated class for the PlanningAffectCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-affect-car',
  templateUrl: 'planning-affect-car.html',
})
export class PlanningAffectCarPage {

  keyClass: any;
  traject: any;
  day: any;
  time: any;
  coop: any;
  defaultCar = [];
  cars = [];
  selectedCar = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public plannigProvider: PlanningProvider , public carProvider: CarProvider, public notif: NotificationProvider) {

    this.keyClass = this.navParams.get('keyClass');
    this.traject = this.navParams.get('traject');
    this.day = this.navParams.get('day');
    this.time = this.navParams.get('time');
    this.coop = this.navParams.get('coop');
    
    let pathPlanning = `cooperative/${this.coop}/planning/${this.day}/${this.time}/${this.traject}`;
    this.plannigProvider.customPath(pathPlanning);
    this.plannigProvider.fetch(this.keyClass).then((classeCar:Planning)=>{
      this.defaultCar = JSON.parse(classeCar.cars);
    });

    let customPath = `cooperative/${this.coop}/car`;
    this.carProvider.customPath(customPath);
    this.carProvider.fetcAll().subscribe((data)=>{
      let cars = [];
      for(let key in data){
        data[key].key= key;
        if(!this.defaultCar){
          this.cars.push(data[key]);
        }else{
          let exist = false;
          for(let w in this.defaultCar){
            if(key == this.defaultCar[w]){
              exist = true;
              break;
            }
          }
          if(!exist){
            this.cars.push(data[key]);
          }
        }
      }
    });

  }

  ionViewDidLoad() {
  }

  save(){
    let message = "Voulez vous affecter ces voitures à ce planning";
 		let title = "Affection de voiture";

 		this.notif.presentConfirm(message, title).then((confirm)=>{
      let pathPlanning = `cooperative/${this.coop}/planning/${this.day}/${this.time}/${this.traject}`;
      this.plannigProvider.customPath(pathPlanning);
      let cars = [];
        if(this.defaultCar){
          for(let w in this.defaultCar){
            cars.push(this.defaultCar[w]);
          }
        }
        for(let w in this.selectedCar){
          cars.push(this.selectedCar[w]);
        }
        let planning = new Planning();
          planning.cars = JSON.stringify(cars);
          this.plannigProvider.save(planning, this.keyClass);
          this.navCtrl.setRoot(PlanningAffectCarListPage, {keyClass: this.keyClass, traject: this.traject, day: this.day, time: this.time, coop: this.coop});

     },()=>{});
  }

}
