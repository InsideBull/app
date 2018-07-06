import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ConnectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connected',
  templateUrl: 'connected.html',
})
export class ConnectedPage {

  user:any;
  constructor(private facebookProvider: FacebookProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = this.facebookProvider.getUser();
  }

  logout(){
  	this.facebookProvider.logout(LoginPage);
  }

}
