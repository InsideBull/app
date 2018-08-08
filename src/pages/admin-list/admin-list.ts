import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';

import { AdministratorProvider } from '../../providers/administrator/administrator';
import { Administrator } from '../../models/administrator.model';
import { NotificationProvider } from '../../providers/notification/notification';

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
	adminsKey: any;
	private loading: Loading;

	 constructor(private adminProvider: AdministratorProvider, 
		private cooperativeProvider: CooperativeProvider, 
		public navCtrl: NavController, 
		public navParams: NavParams,
		private loadingCtrl: LoadingController,
		public notif: NotificationProvider) {
			this.toConstruct();
 	}

 	ionViewWillEnter() {
		
	 }
	 
	 toConstruct(){
		this.loading = this.loadingCtrl.create();
		this.loading.present();
 		this.key = this.navParams.get('key');
		 
 		this.cooperativeProvider.fetch(this.key).then(
			 (data: Cooperative) => {
				 this.cooperative = data;
				 this.admins = [];

 				this.adminsKey = [];

 				this.adminsKey = JSON.parse(data.admins);

 				for(let key in this.adminsKey){
 					this.adminProvider.fetch(this.adminsKey[key]).then((admin)=>{					
						admin['key'] = this.adminsKey[key]
 						this.admins.push(admin);

 					})
 				}

				 this.loading.dismiss();
			 });
	 }

	 delete(i: any){
		let message = "Voulez vous enlever cet administrateur du coopérative " + this.cooperative.name;
		let title = "Suppression";
	   this.notif.presentConfirm(message, title).then((confirm)=>{

		 this.adminsKey.splice(this.adminsKey.indexOf(i), 1);
		 
		 this.cooperative.admins = JSON.stringify(this.adminsKey);

		 this.cooperativeProvider.save(this.cooperative,this.key);
		 this.navCtrl.setRoot(AdminListPage, {key: this.key});
	   },()=>{});
	  }

 }
