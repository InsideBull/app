import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrajetEditPage } from '../trajet-edit/trajet-edit';
import { TrajetAffectPage } from '../trajet-affect/trajet-affect';
import { TrajetClasseListPage } from '../trajet-classe-list/trajet-classe-list';

/**
 * Generated class for the TrajetParametersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-parameters',
  templateUrl: 'trajet-parameters.html',
})
export class TrajetParametersPage {

  key: any;
  coop: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.key = this.navParams.get('key');
    this.coop = this.navParams.get('coop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrajetListPage'); 
  }

  editTrajet(){
  	this.navCtrl.push(TrajetEditPage, {key: this.key, coop: this.navParams.get('coop')})
  }

  affectClassePrice(){
    this.navCtrl.push(TrajetAffectPage, {key: this.key, coop:this.coop});
  }

  listPriceClasse(){
    this.navCtrl.push(TrajetClasseListPage, {key:this.key});
  }

}
