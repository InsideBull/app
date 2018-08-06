import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { PlanningProvider } from '../../providers/planning/planning';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { StationProvider } from '../../providers/station/station';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { CarProvider } from '../../providers/car/car';
import { NotificationProvider } from '../../providers/notification/notification';
import { PriceTrajetProvider } from '../../providers/price-trajet/price-trajet';
import { DayPlanning } from '../../models/day-planning.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the PlanningCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-create',
  templateUrl: 'planning-create.html',
})
export class PlanningCreatePage {
  coop: any;
  trajets = [];
  priceClasse = [];
  days = new DayPlanning().days;
  form: FormGroup;
  cars = [];
  selectedCar = [];
  selectTraject = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public plannigProvider: PlanningProvider, public cooperativeProvider: CooperativeProvider, public trajetProvider: TrajetProvider, public stationProvider: StationProvider, public bookingClassProvider: BookingClassProvider, public carProvider: CarProvider,public notif: NotificationProvider, public priceTrajetProvider: PriceTrajetProvider, public formBuilder: FormBuilder)  {
    this.form = this.formBuilder.group({
      day: ['', Validators.required],//idday
      trajet: ['',Validators.required],//idtrajet
      time: ['',Validators.required],
      classe: ['',Validators.required],//idclasse
      car:[, Validators.required]
    });

    this.coop = this.navParams.get('coop');
    let pathTrajet = `cooperative/${this.coop}/trajet`;
    let pathBooking = `cooperative/${this.coop}/booking_class`;
    this.bookingClassProvider.customPath(pathBooking);
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
        this.trajets.push(trajets[key]);
      }
    });

    let customPath = `cooperative/${this.coop}/car`;
    this.carProvider.customPath(customPath);
    this.carProvider.fetcAll().subscribe((data)=>{
      for(let key in data){
        data[key].key= key;
        this.cars.push(data[key]);
      }
    })

  }

  ionViewDidLoad() {
  }

  onSubmit(){

  }

  onChange(classe){
    console.log("on change");
      let pathPriceTrajet = `cooperative/${this.coop}/trajet/${classe}/price`;
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
  }

}
