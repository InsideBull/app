import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DayPlanning } from '../../models/day-planning.model';
import { Traject } from '../../models/traject.model';
import { PriceTrajet } from '../../models/price-trajet';
import { PlanningProvider } from '../../providers/planning/planning';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { StationProvider } from '../../providers/station/station';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { CarProvider } from '../../providers/car/car';
import { NotificationProvider } from '../../providers/notification/notification';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Planning } from '../../models/planning.model';
import { PlanningDetailsPage } from '../planning-details/planning-details';
import { PlanningListPage } from '../planning-list/planning-list';

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

  form: FormGroup;
  selectedCar = [];

  days = new DayPlanning().days;

  cars = [];
  trajects = [];
  priceClasse = [];
  dayString: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plannigProvider: PlanningProvider, public trajetProvider: TrajetProvider, public stationProvider: StationProvider, public bookingClassProvider: BookingClassProvider, public carProvider: CarProvider,public notif: NotificationProvider, public priceTrajetProvider: PriceTrajetProvider, public formBuilder: FormBuilder)  {

    this.form = this.formBuilder.group({
      day: ['', Validators.required],//idday
      trajet: ['',Validators.required],//idtrajet
      time: ['',Validators.required],
      classe: ['',Validators.required],//idclasse
      car:[, Validators.required]
    });

    this.coop = this.navParams.get('coop');
    this.keyClass = this.navParams.get('keyClass');
    this.traject = this.navParams.get('traject');
    this.day = this.navParams.get('day');
    this.time = this.navParams.get('time');

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

    let customPath = `cooperative/${this.coop}/car`;
    this.carProvider.customPath(customPath);
    this.carProvider.fetcAll().subscribe((data)=>{
      let cars = [];
      for(let key in data){
        data[key].key= key;
        this.cars.push(data[key]);
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

    let message = "Voulez vous Modifier cette plannification";
     let title = "Modification";
     this.notif.presentConfirm(message, title).then(
      (confirm)=>{
        if(this.form.valid){
          let value = this.form.value;
          let pathPlanning = `cooperative/${this.coop}/planning/${this.day}/${this.time}/${this.traject}`;
          this.plannigProvider.customPath(pathPlanning);

          let cars = [];
          for(let w in this.selectedCar){
            cars.push(this.selectedCar[w]);
          }
          let planning = new Planning();
          planning.cars = JSON.stringify(cars);
          let key = this.plannigProvider.save(planning, value.classe);
          let search = value.time;
          this.navCtrl.setRoot(PlanningListPage, { coop: this.coop, search: search});
        }
      },()=>{});
  }

}
