import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerDetailPage } from '../worker-detail/worker-detail'
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

  workers: any;
  cooperativeKey: any;
  empty: boolean = false;
  constructor(private workerProvider: WorkerProvider, public navCtrl: NavController, public navParams: NavParams,
  public workerTypeProvider: WorkerTypeProvider) {
  }

  ionViewWillEnter() {

    this.workers = [];

    this.cooperativeKey = this.navParams.get('cooperativeKey');

    let path = `cooperative/${this.cooperativeKey}/worker`;

    this.workerProvider.customPath(path);

    this.workerProvider.fetcAll().subscribe((workers)=>{
    	if (workers) {
        for(let key in workers){
        workers[key].key = key;
        this.workerTypeProvider.fetch(workers[key].type).then((type)=>{
          workers[key].type = type;
        })

        if (!workers[key].image) {
          workers[key].image = "assets/icon/man.png";
        }

        this.workers.push(workers[key]);
      }
      }
      else{
        this.empty = true;
      }
    })

  }

  showDetails(key){
  	this.navCtrl.push(WorkerDetailPage, {key: key, cooperativeKey: this.cooperativeKey});
  }

}
