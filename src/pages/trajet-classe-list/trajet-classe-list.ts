import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PriceTrajet } from '../../models/price-trajet';

/**
 * Generated class for the TrajetClasseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-classe-list',
  templateUrl: 'trajet-classe-list.html',
})
export class TrajetClasseListPage {

  coop: any;
  key: any;
  classes: [PriceTrajet];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrajetClasseListPage');
  }

}
