import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { PlanningProvider } from '../../providers/planning/planning';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { StationProvider } from '../../providers/station/station';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public plannigProvider: PlanningProvider, public cooperativeProvider: CooperativeProvider, public trajetProvider: TrajetProvider, public stationProvider: StationProvider, public bookingClassProvider: BookingClassProvider)  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanningCreatePage');
  }

}
