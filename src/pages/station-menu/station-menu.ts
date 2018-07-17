import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StationCreatePage } from '../station-create/station-create'

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

  }

  addStation(){
  	this.navCtrl.push(StationCreatePage);
  }

}
