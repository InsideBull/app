import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { TrajetListPage } from '../trajet-list/trajet-list';
import { TrajetCreatePage } from '../trajet-create/trajet-create';

/**
 * Generated class for the TrajetMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-menu',
  templateUrl: 'trajet-menu.html',
})
export class TrajetMenuPage {

  coop : any;
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

  ionViewDidLoad() {
    
  }

  listTrajet(){
    this.navCtrl.push(TrajetListPage, {coop: this.coop });
  }

  addTrajet(){
    this.navCtrl.push(TrajetCreatePage, {coop: this.coop});
  }

}
