import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminListPage } from '../admin-list/admin-list';
import { AdminAddPage } from '../admin-add/admin-add';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';

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
  cooperative = {} ;
  constructor(private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.key = this.navParams.get('key') || null;

    this.cooperativeProvider.fetch(this.key).then((cooperative)=>{
      this.cooperative = cooperative;
    })

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
