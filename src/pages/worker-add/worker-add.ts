import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationProvider } from '../../providers/notification/notification';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';
import { Platform, Events, ViewController } from 'ionic-angular';
import { Worker } from '../../models/worker.model';
import { WorkerType } from '../../models/worker-type.model';
import { CameraProvider } from '../../providers/camera/camera';
import { Car } from '../../models/car.model';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { WorkerDetailPage } from '../worker-detail/worker-detail';
import { ImageWidgetPage } from '../image-widget/image-widget'
import { WorkersCarPage } from '../workers-car/workers-car';

/**
 * Generated class for the WorkerAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-add',
  templateUrl: 'worker-add.html',
})
export class WorkerAddPage {

  form: FormGroup;
  cooperativeKey: any
  image :any;
 	url:any; 
  workertypes: any;
  cooperative: Cooperative = new Cooperative();
  carKey: any;

 	constructor(private modalCtrl : ModalController, private workertypeProvider: WorkerTypeProvider,private cooperativeProvider: CooperativeProvider, private cameraProvider: CameraProvider, private workerProvider: WorkerProvider, public notif: NotificationProvider, public platform:Platform, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public alertCtrl: AlertController) {
 		this.form = this.formBuilder.group({
 			name: ['',Validators.required],			
 			matricule: ['',Validators.required],	
       type: ['',Validators.required],	
       tel: [, Validators.required]	

 		});
     this.toConstruct();
 	}

 	ionViewWillEnter() {
  }
  
  toConstruct(){
    this.cooperativeKey = this.navParams.get('cooperativeKey');
    this.carKey = this.navParams.get('carKey');
    
    this.cooperativeProvider.fetch(this.cooperativeKey).then(
      (data: Cooperative) => { 
        this.cooperative = data;
      });
  
      this.workertypes = [];
  
     this.workertypeProvider.fetcAll().subscribe((workertypes)=>{
  
       for(let key in workertypes){
         workertypes[key].key = key;
          this.workertypes.push(workertypes[key]);
       }
     });

   }
   onSubmit(){
    let message = "Voulez vous vraimment ajouter l'employés N° " + this.form.value.matricule + " dans " + this.cooperative.name;
    let title = "Ajout d'employés"
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
       if(this.carKey){
        this.navCtrl.push(WorkersCarPage, {key: this.carKey, coop: this.cooperativeKey});
       }
       this.navCtrl.setRoot(WorkerDetailPage, {key: key, cooperativeKey: this.cooperativeKey});
     },
     ()=>{});	
    
  }

  imageWidget(){
     let modal = this.modalCtrl.create(ImageWidgetPage, null, {cssClass:'pricebreakup' });

     modal.onDidDismiss(image => {
       if (image) {
         this.image = image;
         this.workerProvider.uploadImage(this.image).then((url)=>{
        this.url = url;
      })
       }
     })

     modal.present();

   }

}
