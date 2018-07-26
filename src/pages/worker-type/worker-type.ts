import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';
import { WorkerMenuPage } from '../worker-menu/worker-menu';
import { NotificationProvider } from '../../providers/notification/notification';
import { WorkerType } from '../../models/worker-type.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the WorkerTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-type',
  templateUrl: 'worker-type.html',
})
export class WorkerTypePage {

  workerType: WorkerType;
  key: any;
  form: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public workerTypeProvider: WorkerTypeProvider,
              public notif: NotificationProvider,
              public formBuilder: FormBuilder) {
      
      this.form = formBuilder.group({
        occupation:['', Validators.required],
        description:['', Validators.required]
      })
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
  }

  onSubmit(){
    let message = "Voulez-vous ajouter ce type d'emploi ?";
    let title = "Ajout";
    this.notif.presentConfirm(message, title).then((confirm)=>{
      let value = this.form.value;
      this.workerType = new WorkerType(value);
      this.workerTypeProvider.save(this.workerType);
      this.navCtrl.push(WorkerMenuPage, {key: this.key});
    },()=>{});
  }

}
