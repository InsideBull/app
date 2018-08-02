import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ CooperativeCreatePage } from '../cooperative-create/cooperative-create';
import { CooperativeListPage } from '../cooperative-list/cooperative-list'

/**
 * Generated class for the CooperativeMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cooperative-menu',
  templateUrl: 'cooperative-menu.html',
})
export class CooperativeMenuPage {

  uid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.init()
  }

  init(){
  	this.uid = this.navParams.get('uid') || '2186409438249498';
  }

  ionViewDidLoad() {
    
  }

  goToCooperativeList(){
  	this.navCtrl.push(CooperativeListPage, {uid: this.uid});
  }

  goToCooperativeCreate(){
  	this.navCtrl.push(CooperativeCreatePage)
  }

}
