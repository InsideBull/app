import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { ConnectedPage } from '../connected/connected';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {
 	facebookProvider: FacebookProvider
 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		
 	}

 	login(){
 		this.facebookProvider.login(ConnectedPage);
 	}

 }
