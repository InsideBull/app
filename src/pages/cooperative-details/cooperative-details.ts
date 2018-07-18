import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { CooperativeManagePage } from '../../pages/cooperative-manage/cooperative-manage';
import { ParametersPage } from '../parameters/parameters';

import { VoyageMenuPage } from '../voyage-menu/voyage-menu';
import { CarMenuPage } from '../car-menu/car-menu';
import { CooperativeListPage } from '../cooperative-list/cooperative-list';

/**
 * Generated class for the CooperativeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cooperative-details',
  templateUrl: 'cooperative-details.html',
})
export class CooperativeDetailsPage {

	cooperative: Cooperative = new Cooperative();
	param: string;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
    public cooperativeProvider: CooperativeProvider,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    this.param = this.navParams.get('key');

    this.cooperativeProvider.fetch(this.param).then(
      (data: Cooperative) => {
          this.cooperative = data;
        });

  }

  goToManage(){
  	this.navCtrl.push(CooperativeManagePage, {key: this.param});
  }

  goToParams(){
    this.navCtrl.push(ParametersPage, {key: this.param});
  }

  goToVoyage(){
    this.navCtrl.push(VoyageMenuPage, {key: this.param});
  }

  goToCar(){
    this.navCtrl.push(CarMenuPage, {key: this.param});
  }

  delete(){
      
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Voulez vous supprimer cette cooperative ?',
      buttons: [
        {
          text: 'annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'supprimer',
          handler: () => {
            this.cooperativeProvider.deleteCooperative(this.param);
            this.navCtrl.push(CooperativeListPage);
          }
        }
      ]
    });
    alert.present();
  }
  
}

