import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';

import { AdministratorProvider } from '../../providers/administrator/administrator';
import { Administrator } from '../../models/administrator.model';

/**
 * Generated class for the AdminListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-admin-list',
 	templateUrl: 'admin-list.html',
 })
 export class AdminListPage {

 	key: any;
 	cooperative: Cooperative = new Cooperative();
	admins: any;
	private loading: Loading;

	 constructor(private adminProvider: AdministratorProvider, 
		private cooperativeProvider: CooperativeProvider, 
		public navCtrl: NavController, 
		public navParams: NavParams,
		private loadingCtrl: LoadingController) {
 	}

 	ionViewDidLoad() {
		this.loading = this.loadingCtrl.create();
		this.loading.present();
 		this.key = this.navParams.get('key');
 		this.admins = [];

 		this.cooperativeProvider.fetch(this.key).then(
 			(data: Cooperative) => {
 				this.cooperative = data;

 				let admins = [];

 				admins = JSON.parse(data.admins);

 				for(let key in admins){
 					this.adminProvider.fetch(admins[key]).then((admin)=>{					

 						this.admins.push(admin)

 					})
 				}

			 });
	
			 this.loading.dismiss();

 	}

 }
