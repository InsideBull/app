import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminListPage } from '../admin-list/admin-list';
import { AdminAddPage } from '../admin-add/admin-add';

/**
 * Generated class for the ParametersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html',
})
export class ParametersPage {

  key:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.key = this.navParams.get('key') || null;
  }

  ionViewDidLoad() {
    
  }

  listAdmin(){
  	this.navCtrl.push(AdminListPage, {key:this.key});
  }

  addAdmin(){
  	this.navCtrl.push(AdminAddPage, {key:this.key});
  }

}
