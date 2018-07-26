import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerProvider } from '../../providers/worker/worker';
import { NotificationProvider } from '../../providers/notification/notification';
import { Worker } from '../../models/worker.model'

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
  worker: Worker = new Worker();
  constructor(private notificationProvider: NotificationProvider, private workerProvider: WorkerProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  	this.key = this.navParams.get('key');
  	this.cooperativeKey = this.navParams.get('cooperativeKey');

  	let path = `cooperative/${this.cooperativeKey}/worker`;

  	this.workerProvider.customPath(path);

  	this.workerProvider.fetch(this.key).then((worker: Worker)=>{
  		this.worker = worker;

      if (!this.worker.image) {
        this.worker.image = "assets/icon/man.png";
      }
      
  	})
    
  }

  delete(){
    this.notificationProvider.presentConfirm().then((confirm)=>{
      this.workerProvider.deleteWorker(this.key);
    },
    ()=>{});
  }

}
