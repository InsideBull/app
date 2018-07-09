import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';

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
export class CooperativeListPage implements {



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cooperativeProvider: CooperativeProvider) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CooperativeListPage');
  }

}
