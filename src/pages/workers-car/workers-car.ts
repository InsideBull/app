import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkersCarListPage } from '../workers-car-list/workers-car-list';
import { WorkersCarAddPage } from '../workers-car-add/workers-car-add' ;
import { WorkerAddPage } from '../worker-add/worker-add';


/**
 * Generated class for the WorkersCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workers-car',
  templateUrl: 'workers-car.html',
})
export class WorkersCarPage {

  key: any;
  coop: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.key = this.navParams.get('key');
    this.coop = this.navParams.get('coop');  
  }

  ionViewWillEnter() {
  }

  listWorkers(){
  	this.navCtrl.push(WorkersCarListPage, {key:this.key, coop:this.coop})
  }

  addWorkers(){
    this.navCtrl.push(WorkersCarAddPage, {key: this.key, coop: this.coop});
  }

}
