import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';
import { Worker } from '../../models/worker.model';
import { WorkerType } from '../../models/worker-type.model';
import { NotificationProvider } from '../../providers/notification/notification';
import { WorkerEditPage } from '../worker-edit/worker-edit';
import { WorkerListPage } from '../worker-list/worker-list';
import { PhoneProvider } from '../../providers/phone/phone'


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
  workerType: WorkerType = new WorkerType();
  photo = false;

  constructor(private phoneProvider:PhoneProvider, private workerTypeProvider: WorkerTypeProvider, private notificationProvider: NotificationProvider, private workerProvider: WorkerProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  	this.key = this.navParams.get('key');
  	this.cooperativeKey = this.navParams.get('cooperativeKey');

  	let customPath = `cooperative/${this.cooperativeKey}/worker`;

  	this.workerProvider.customPath(customPath);

  	this.workerProvider.fetch(this.key).then((worker: Worker)=>{
  		this.worker = worker;

      if (!this.worker.image) {
        this.worker.image = "assets/icon/man.png";
        this.photo = true;
      }

      this.workerTypeProvider.fetch(worker.type).then((workerType: WorkerType)=>{
        this.workerType = workerType;
      })
      this.worker = worker;

      
  	})
    
  }

  delete(){
    this.notificationProvider.presentConfirm().then((confirm)=>{
      this.workerProvider.deleteWorker(this.key);
      if(!this.photo){
        this.workerProvider.deleteImg(this.worker.image);
      }
      this.navCtrl.push(WorkerListPage, {cooperativeKey: this.cooperativeKey});
    },
    ()=>{});
  }
  editer(){
    this.navCtrl.push(WorkerEditPage, {key: this.key, cooperativeKey: this.cooperativeKey});
  }

  callWorker(){
      this.phoneProvider.call(this.worker.tel + '');
  }

}
