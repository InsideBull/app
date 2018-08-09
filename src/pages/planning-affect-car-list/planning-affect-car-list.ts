import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Planning } from '../../models/planning.model';
import { PlanningProvider } from '../../providers/planning/planning';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the PlanningAffectCarListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-affect-car-list',
  templateUrl: 'planning-affect-car-list.html',
})
export class PlanningAffectCarListPage {

  keyClass: any;
  traject: any;
  day: any;
  time: any;
  coop: any;
  empty = false;

  cars = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public plannigProvider: PlanningProvider, public notif: NotificationProvider, public priceTrajetProvider: PriceTrajetProvider) {

    this.keyClass = this.navParams.get('keyClass');
    this.traject = this.navParams.get('traject');
    this.day = this.navParams.get('day');
    this.time = this.navParams.get('time');
    this.coop = this.navParams.get('coop');
    
    let pathPlanning = `cooperative/${this.coop}/planning/${this.day}/${this.time}/${this.traject}`;
    this.plannigProvider.customPath(pathPlanning);
    this.plannigProvider.fetch(this.keyClass).then((classeCar:Planning)=>{
      if(classeCar){
        this.cars = JSON.parse(classeCar.cars);
      }else{
        this.empty = true;
      }
    });


  }

  ionViewDidLoad() {
  }

  delete(i: any){
    let message = "Voulez vous enlever cette voiture de cette plannification";
    let title = "Suppression";
   this.notif.presentConfirm(message, title).then((confirm)=>{
     let workers = [];
     workers = this.cars;
     workers.splice(workers.indexOf(i), 1);
     let planning = new Planning();
     planning.cars = JSON.stringify(workers);
     this.plannigProvider.save(planning, this.keyClass);
     this.navCtrl.setRoot(PlanningAffectCarListPage, {keyClass: this.keyClass, traject: this.traject, day: this.day, time: this.time, coop: this.coop});
   },()=>{});
  }

}
