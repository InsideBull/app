import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanningProvider } from '../../providers/planning/planning';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { StationProvider } from '../../providers/station/station';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { CarProvider } from '../../providers/car/car';
import { NotificationProvider } from '../../providers/notification/notification';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { FormBuilder } from '@angular/forms';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Planning } from '../../models/planning.model';
import { Coordinate } from '../../classes/coordinate.class';
import { PriceTrajet } from '../../models/price-trajet';
import { DayPlanning } from '../../models/day-planning.model';
import { PlanningEditPage } from '../planning-edit/planning-edit';
import { PlanningListPage } from '../planning-list/planning-list';
import { MapPage } from '../map/map';
import { Traject } from '../../models/traject.model';

/**
 * Generated class for the PlanningDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-details',
  templateUrl: 'planning-details.html',
})
export class PlanningDetailsPage {
  keyClass: any;
  traject: any;
  day: any;
  time: any;
  coop: any;

  days = new DayPlanning().days;

  cars = [];
  trajetObj: Traject = new Traject();
  classeObj: PriceTrajet = new PriceTrajet();
  dayString: any;
  origin: any;
  destination: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plannigProvider: PlanningProvider, public trajetProvider: TrajetProvider, public stationProvider: StationProvider, public bookingClassProvider: BookingClassProvider, public carProvider: CarProvider,public notif: NotificationProvider, public priceTrajetProvider: PriceTrajetProvider, public formBuilder: FormBuilder)  {

    this.keyClass = this.navParams.get('keyClass');
    this.traject = this.navParams.get('traject');
    this.day = this.navParams.get('day');
    this.time = this.navParams.get('time');
    this.coop = this.navParams.get('coop');

    let customPath = `cooperative/${this.coop}/planning/${this.day}/${this.time}/${this.traject}`;
    this.plannigProvider.customPath(customPath);
    this.plannigProvider.fetch(this.keyClass).then((classeCar:Planning)=>{
      this.cars = JSON.parse(classeCar.cars);
    });

    let pathTrajet = `cooperative/${this.coop}/trajet`;
    let pathBooking = `cooperative/${this.coop}/booking_class`;
    let pathPrice = `cooperative/${this.coop}/trajet/${this.traject}/price`;
    this.priceTrajetProvider.customPath(pathPrice);
    this.bookingClassProvider.customPath(pathBooking);
    this.trajetProvider.customPath(pathTrajet);

    this.trajetProvider.fetch(this.traject).then((trajet)=>{

      this.stationProvider.fetch(trajet['depart']).then((data)=>{
        this.trajetObj.depart = data;
        this.origin = new Coordinate({lat: data['latitude'], lng: data['latitude']});
      });
      this.stationProvider.fetch(trajet['arrive']).then((data)=>{
        this.trajetObj.arrive = data;
        this.destination = new Coordinate({lat: data['latitude'], lng: data['latitude']});
      });
      console.log(this.trajetObj);
    });

    

    this.priceTrajetProvider.fetch(this.keyClass).then((data:PriceTrajet)=>{
        this.classeObj = data;
          this.bookingClassProvider.fetch(this.keyClass).then((result) => {
            this.classeObj.classe = result;
          })
    });

    this.dayString = this.days.find(day=> day.id== this.day);

  }

  ionViewDidLoad() {

    console.log(this.keyClass, this.traject);
  }

  goToParameters(){
    this.navCtrl.push(PlanningEditPage, {keyClass: this.keyClass, trajet: this.traject, day: this.day, time: this.time, coop: this.coop});
  }

  delete(){
    let message : 'Voulez vous supprimer cette plannification ?'; 
    let title = 'Suppression';

    this.notif.presentConfirm(message, title).then((confirm)=>{
      let customPath = `cooperative/${this.coop}/planning`;
      this.plannigProvider.customPath(customPath);
      this.plannigProvider.deletePlanning(this.day);
      this.navCtrl.push(PlanningEditPage, {keyClass: this.keyClass, trajet: this.traject, day: this.day, time: this.time, coop: this.coop});
    },()=>{});
  }

  showCarte(){
    this.navCtrl.push(MapPage, {origin: this.origin, destination: this.destination});
  }


}
