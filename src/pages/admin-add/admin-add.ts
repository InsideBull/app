import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';

import { Administrator } from '../../models/administrator.model'

/**
 * Generated class for the AdminAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-add',
  templateUrl: 'admin-add.html',
})
export class AdminAddPage {

  myFriends: any;

  constructor(private facebookProvider: FacebookProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.myFriends = [];
    this.facebookProvider.getUserFriends().then((friends)=>{
    	this.myFriends = friends;
    })
  }

}
