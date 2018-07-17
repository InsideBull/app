import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StationCreatePage } from '../station-create/station-create'
import { StationListPage } from '../station-list/station-list';

/**
 * Generated class for the StationMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-station-menu',
  templateUrl: 'station-menu.html',
})
export class StationMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  listStation(){
    this.navCtrl.push(StationListPage);
  }

  addStation(){
  	this.navCtrl.push(StationCreatePage);
  }

}
