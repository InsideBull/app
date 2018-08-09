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

  cooperativeKey:any;
  worker: Worker = new Worker();

  cooperative: Cooperative = new Cooperative();
  constructor(private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.cooperativeKey = this.navParams.get('key');
      this.cooperativeProvider.fetch(this.cooperativeKey).then(
        (data: Cooperative) => { 
          this.cooperative = data;
        });
  }

  ionViewWillEnter() {
  }

 	addWorkerType(){
 		this.navCtrl.push(WorkerTypePage, {cooperativeKey: this.cooperativeKey});
 	}

 	listWorker(){
		this.navCtrl.push(WorkerListPage, {cooperativeKey: this.cooperativeKey});
 	}

 	addWorker(){
 		this.navCtrl.push(WorkerAddPage, {cooperativeKey:this.cooperativeKey});
 	}


}
