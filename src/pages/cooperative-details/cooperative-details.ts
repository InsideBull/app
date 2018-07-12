import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { CooperativeManagePage } from '../../pages/cooperative-manage/cooperative-manage';
import { ParametersPage } from '../parameters/parameters';

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

	cooperative: any;
	param: string;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public cooperativeProvider: CooperativeProvider) {
  }

  ionViewDidLoad() {
    this.param = this.navParams.get('key');

    this.cooperativeProvider.fetch(this.param).then(
  		(data) => {
  				this.cooperative = data;
  			});

  }

  goToManage(){
  	this.navCtrl.push(CooperativeManagePage, {'key': this.param});
  }

  goToParams(){
    this.navCtrl.push(ParametersPage, {'key': this.param});
  }
}

