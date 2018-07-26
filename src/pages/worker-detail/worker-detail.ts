import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerProvider } from '../../providers/worker/worker';

import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';
import { Worker } from '../../models/worker.model';
import { WorkerType } from '../../models/worker-type.model';

import { NotificationProvider } from '../../providers/notification/notification';


/**
 * Generated class for the WorkerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-detail',
  templateUrl: 'worker-detail.html',
})
export class WorkerDetailPage {

  key: any;
  cooperativeKey: any;
  worker: Worker;
  workerType: WorkerType;
  constructor(private workerProvider: WorkerProvider, public navCtrl: NavController, public navParams: NavParams,public workerTypeProvider: WorkerTypeProvider, private notificationProvider: NotificationProvider) {
  }

  ionViewDidLoad() {

  	this.key = this.navParams.get('key');
  	this.cooperativeKey = this.navParams.get('cooperativeKey');

  	let path = `cooperative/${this.cooperativeKey}/worker`;

  	this.workerProvider.customPath(path);

  	this.workerProvider.fetch(this.key).then((worker: Worker)=>{
      this.workerTypeProvider.fetch(worker.type).then((workerType: WorkerType)=>{
        this.workerType = workerType;
      })
      this.worker = worker;
      
  	})
    
  }

  delete(){
    this.notificationProvider.presentConfirm().then((confirm)=>{
      this.workerProvider.deleteWorker(this.key);
    },
    ()=>{});
  }

}
