import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageManagePage } from '../voyage-manage/voyage-manage';
import { TripAffectPage } from '../trip-affect/trip-affect';
import { TripListPage } from '../trip-list/trip-list'

/**
 * Generated class for the VoyageParametersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voyage-parameters',
  templateUrl: 'voyage-parameters.html',
})
export class VoyageParametersPage {

  key : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
  }

  editVoyage(){
  	this.navCtrl.push(VoyageManagePage, {key: this.key, coop: this.navParams.get('coop')})
  }

  affectCar(){
    this.navCtrl.push(TripAffectPage, {key: this.key});
  }

  listCar(){
    this.navCtrl.push(TripListPage, {key:this.key});
  }

}
