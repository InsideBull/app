import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Administrator } from '../../models/administrator.model';
import { AdministratorProvider } from '../../providers/administrator/administrator';
import { FacebookProvider } from '../../providers/facebook/facebook';

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-confirmation',
 	templateUrl: 'confirmation.html',
 })
 export class ConfirmationPage {

 	qrcode: any;
 	constructor(private facebookProvider: FacebookProvider, private adminProvider: AdministratorProvider, public navCtrl: NavController, public navParams: NavParams) {
 		this.qrcode = this.navParams.get('qrcode')|| null;

 		this.confirmAdmin();
 		
 	}

 	ionViewDidLoad() {

 		
 	}

 	confirmAdmin(){
 		this.facebookProvider.getUser().then((user)=>{
 			
 			let admin = {
 				email: user['email'],
 				name: user['name']
 			}

 			this.adminProvider.save(new Administrator(admin),user['id']);

 		})
 	}

 	verification(){

 		
 	}




 }
