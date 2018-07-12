import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeDetailsPage } from '../../pages/cooperative-details/cooperative-details';

/**
 * Generated class for the CooperativeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cooperative-list',
  templateUrl: 'cooperative-list.html',
})
export class CooperativeListPage {

  cooperatives : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cooperativeProvider: CooperativeProvider) {
  }



  ionViewDidLoad() {
  	this.cooperatives = [];
  	this.cooperativeProvider.fetcAll().subscribe(
  		(data) => {
  			for(let key in data){
  				data[key].key = key;
  				this.cooperatives.push(data[key]);
  			}
  		});
    
  }

  onClickItem(i: any) {
  	this.navCtrl.push(CooperativeDetailsPage, {'key': i});
  }

}
