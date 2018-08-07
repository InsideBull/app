import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanningEditPage } from '../planning-edit/planning-edit';
import { PlanningAffectCarPage } from '../planning-affect-car/planning-affect-car';
import { PlanningAffectCarListPage } from '../planning-affect-car-list/planning-affect-car-list';

/**
 * Generated class for the PlanningParameterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-parameter',
  templateUrl: 'planning-parameter.html',
})
export class PlanningParameterPage {
  keyClass: any;
  traject: any;
  day: any;
  time: any;
  coop: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.keyClass = this.navParams.get('keyClass');
    this.traject = this.navParams.get('traject');
    this.day = this.navParams.get('day');
    this.time = this.navParams.get('time');
    this.coop = this.navParams.get('coop');
  }

  ionViewDidLoad() {
  }

  editPlanning(){
		this.navCtrl.push(PlanningEditPage, {keyClass: this.keyClass, traject: this.traject, day: this.day, time: this.time, coop: this.coop});
  }

  affectCar(){
    this.navCtrl.push(PlanningAffectCarPage, {keyClass: this.keyClass, traject: this.traject, day: this.day, time: this.time, coop: this.coop});
  }

  listCar(){
    this.navCtrl.push(PlanningAffectCarListPage, {keyClass: this.keyClass, traject: this.traject, day: this.day, time: this.time, coop: this.coop});
  }

}
