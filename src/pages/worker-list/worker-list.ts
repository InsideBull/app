import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';

/**
 * Generated class for the WorkerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-list',
  templateUrl: 'worker-list.html',
})
export class WorkerListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public workerTypeProvider: WorkerTypeProvider) {
  }

  ionViewDidLoad() {
    
  }

}
