import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanningProvider } from '../../providers/planning/planning';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { StationProvider } from '../../providers/station/station';
import { Cooperative } from '../../models/cooperative.model';
import { PlanningListPage } from '../planning-list/planning-list';
import { PlanningCreatePage } from '../planning-create/planning-create';

/**
 * Generated class for the PlanningMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-menu',
  templateUrl: 'planning-menu.html',
})
export class PlanningMenuPage {

  coop: any;
  cooperative: Cooperative = new Cooperative();


  constructor(public navCtrl: NavController, public navParams: NavParams, public cooperativeProvider: CooperativeProvider) {
    this.coop = this.navParams.get('key');

    this.cooperativeProvider.fetch(this.coop).then(
      (data: Cooperative) => {
        this.cooperative = data;
        if(!this.cooperative.logo){
          this.cooperative.logo = "assets/icon/copyright.png"
        }
      });
  }

  ionViewDidLoad() {}

  listPlannig(){
    this.navCtrl.push(PlanningListPage, {coop: this.coop });
  }

  addPlannig(){
    this.navCtrl.push(PlanningCreatePage, {coop: this.coop});
  }

}
