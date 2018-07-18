import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { VoyageListPage } from '../voyage-list/voyage-list'
import { VoyageCreatePage } from '../voyage-create/voyage-create'
/**
 * Generated class for the VoyageMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-voyage-menu',
 	templateUrl: 'voyage-menu.html',
 })
 export class VoyageMenuPage {

 	key:any;
 	cooperative: Cooperative = new Cooperative();
 	constructor(private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		this.key = this.navParams.get('key');
 		this.cooperativeProvider.fetch(this.key).then(
 			(data: Cooperative) => {
 				this.cooperative = data;
 				if(!this.cooperative.logo){
 					this.cooperative.logo = "assets/icon/copyright.png"
 				}
 			});
 	}

 	listVoyage(){
 		this.navCtrl.push(VoyageListPage, {key: this.key });
 	}

 	addVoyage(){
 		this.navCtrl.push(VoyageCreatePage, {key: this.key});
 	}

 }
