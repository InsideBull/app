import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DayPlanning } from '../../models/day-planning.model';
import { PlanningProvider } from '../../providers/planning/planning';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { StationProvider } from '../../providers/station/station';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { NotificationProvider } from '../../providers/notification/notification';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { Planning } from '../../models/planning.model';
import { PlanningDetailsPage } from '../planning-details/planning-details';

/**
 * Generated class for the PlanningEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-edit',
  templateUrl: 'planning-edit.html',
})
export class PlanningEditPage {

  keyClass: any;
  traject: any;
  day: any;
  time: any;
  coop: any;
  
  lastClass: any;
  lastTraject: any;
  lastDay: any;
  lastTime: any;

  selectedCar = [];

  days = new DayPlanning().days;

  trajects = [];
  priceClasse = [];
  dayString: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plannigProvider: PlanningProvider, public trajetProvider: TrajetProvider, public stationProvider: StationProvider, public bookingClassProvider: BookingClassProvider, public notif: NotificationProvider, public priceTrajetProvider: PriceTrajetProvider)  {


    this.coop = this.navParams.get('coop');
    this.keyClass = this.navParams.get('keyClass');
    this.traject = this.navParams.get('traject');
    this.day = this.navParams.get('day');
    this.time = this.navParams.get('time');

    this.lastClass = this.keyClass;
    this.lastDay = this.day;
    this.lastTime = this.time;
    this.lastTraject = this.traject

    let pathBooking = `cooperative/${this.coop}/booking_class`;
    this.bookingClassProvider.customPath(pathBooking);
    let pathTrajet = `cooperative/${this.coop}/trajet`;
    this.trajetProvider.customPath(pathTrajet);
    
    
    this.trajetProvider.fetcAll().subscribe((trajets)=>{
      for(let key in trajets){
        trajets[key].key = key;
        this.stationProvider.fetch(trajets[key].depart).then((depart)=>{
          trajets[key].depart = depart;
        });
        this.stationProvider.fetch(trajets[key].arrive).then((arrive)=>{
          trajets[key].arrive = arrive;
        });
        this.trajects.push(trajets[key]);
      }
    });


    let pathPriceTrajet = `cooperative/${this.coop}/trajet/${this.traject}/price`;
    this.priceTrajetProvider.customPath(pathPriceTrajet);
    this.priceTrajetProvider.fetcAll().subscribe((data)=>{
      this.priceClasse = [];
      for(let key in data){
        data[key].key = key;
        this.bookingClassProvider.fetch(key).then((result) => {
          data[key].classe = result;
        });
        this.priceClasse.push(data[key]);
      }
    });
    let pathPlanning = `cooperative/${this.coop}/planning/${this.day}/${this.time}/${this.traject}`;
    this.plannigProvider.customPath(pathPlanning);
    this.plannigProvider.fetch(this.keyClass).then((classeCar:Planning)=>{
      this.selectedCar = JSON.parse(classeCar.cars);
    });
  }

  ionViewDidLoad() {

  }

  onSubmit(){

    let message = "Voulez vous modifier cette plannification";
     let title = "Modification";
     this.notif.presentConfirm(message, title).then(
       (confirm)=>{
          let pathPlanning = `cooperative/${this.coop}/planning/${this.lastDay}/${this.lastTime}/${this.lastTraject}`;
          this.plannigProvider.customPath(pathPlanning);
          this.plannigProvider.deletePlanning(this.lastClass);

          pathPlanning = `cooperative/${this.coop}/planning/${this.day}/${this.time}/${this.traject}`;
          this.plannigProvider.customPath(pathPlanning);
          let planning = new Planning();
          planning.cars = JSON.stringify(this.selectedCar);
          let key = this.plannigProvider.save(planning, this.keyClass);
          this.navCtrl.setRoot(PlanningDetailsPage, {keyClass: this.keyClass, traject: this.traject, day: this.day, time: this.time, coop: this.coop});
      },()=>{});
  }

}
