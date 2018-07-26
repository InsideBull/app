import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Worker } from '../../models/worker.model';
import { WorkerType } from '../../models/worker-type.model';
import { CameraProvider } from '../../providers/camera/camera';
import { NotificationProvider } from '../../providers/notification/notification';
import { WorkerDetailPage } from '../worker-detail/worker-detail';

/**
 * Generated class for the WorkerEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-edit',
  templateUrl: 'worker-edit.html',
})
export class WorkerEditPage {

  form: FormGroup;
  key: any
  image :any;
  url:any; 
  cooperativeKey: any;
  workertypes: any;
  worker: Worker;
  workerType: WorkerType;

  constructor(public navCtrl: NavController, public navParams: NavParams,public workerProvider: WorkerProvider, public workerTypeProvider: WorkerTypeProvider,
  public formBuilder: FormBuilder, public cameraProvider: CameraProvider, public notif: NotificationProvider) {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],			
      matricule: ['',Validators.required],	
      type: ['',Validators.required],		

    });
  }

  ionViewDidLoad() {

    this.key = this.navParams.get('key');
    this.cooperativeKey = this.navParams.get('cooperativeKey');
    
    this.workertypes = [];
    this.workerTypeProvider.fetcAll().subscribe((workertypes)=>{

      for(let key in workertypes){
        workertypes[key].key = key;
         this.workertypes.push(workertypes[key]);
      }
    });

    this.worker = new Worker();
    let customPath = `cooperative/${this.cooperativeKey}/worker`;
    this.workerProvider.customPath(customPath);
    this.workerProvider.fetch(this.key).then((worker: Worker)=>{
      this.worker = worker;
    });
    
  }


  fromGallery(){
    this.cameraProvider.selectPhoto().then((image)=>{
      this.image = image;
      this.workerProvider.uploadImage(this.image).then((url)=>{
        this.url = url;
      })
    })
  }

  fromCamera(){
    this.cameraProvider.takePhoto().then((image)=>{
      this.image = image;
      this.workerProvider.uploadImage(this.image).then((url)=>{
        this.url = url;
      })
    })
  }

  onSubmit(){
    let message = "Voulez vous vraimment modifier l'employés N° " + this.form.value.matricule;
    let title = "Editer emploié"
   this.notif.presentConfirm(message, title).then(
     (confirm)=>{
       let value = this.form.value;
       if(this.url){
         value.image = this.url;
       }
       let worker = new Worker(value);
       let customPath = `cooperative/${this.cooperativeKey}/worker`;
       this.workerProvider.customPath(customPath);
       let key = this.workerProvider.save(worker);
       this.navCtrl.push(WorkerDetailPage, {key: key, cooperativeKey: this.cooperativeKey});
     },
     ()=>{});	
    
  }

}
