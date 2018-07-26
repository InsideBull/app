import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Worker } from '../../models/worker.model';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerListPage } from '../worker-list/worker-list';
import { WorkerAddPage } from '../worker-add/worker-add';
import { WorkerTypePage } from '../worker-type/worker-type';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';


/**
 * Generated class for the WorkerMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-menu',
  templateUrl: 'worker-menu.html',
})
export class WorkerMenuPage {

  key:any;
  worker: Worker = new Worker();
  cooperative: Cooperative = new Cooperative();
  constructor(private cooperativeProvider: CooperativeProvider,private workerProvider: WorkerProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
	this.key = this.navParams.get('key');
    this.cooperativeProvider.fetch(this.key).then(
      (data: Cooperative) => { 
        this.cooperative = data;
      });
  }

 	addWorkerType(){
 		this.navCtrl.push(WorkerTypePage, {key: this.key});
 	}

 	listWorker(){
		this.navCtrl.push(WorkerListPage, {key: this.key});
 	}

 	addWorker(){
 		this.navCtrl.push(WorkerAddPage, {key:this.key});
 	}


}
