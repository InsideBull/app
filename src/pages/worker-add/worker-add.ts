import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationProvider } from '../../providers/notification/notification';
import { WorkerProvider } from '../../providers/worker/worker';
import { Platform, Events, ViewController } from 'ionic-angular';
import { Worker } from '../../models/worker.model';
import { CameraProvider } from '../../providers/camera/camera';
import { Car } from '../../models/car.model';

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
  key:any;
  name: String;
  matricule: String;
  type: String;
  image :any;
 	url:any; 

  car: Car = new Car();

 	constructor(private cameraProvider: CameraProvider, private workerProvider: WorkerProvider, public notif: NotificationProvider, public platform:Platform, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public alertCtrl: AlertController) {
 		this.form = this.formBuilder.group({
 			name: ['',Validators.required],			
 			matricule: ['',Validators.required],	
 			type: ['',Validators.required],		

 		});
 	}

 	ionViewDidLoad() {
 	}

 
   onSubmit(){
    let message = "Voulez vous vraimment ajouter l'employés N° " + this.form.value.matricule + " dans " + this.car.matricule;
    let title = "Ajout d'employés"
   this.notif.presentConfirm(message, title).then(
     (confirm)=>{
       let value = this.form.value;
       if(this.url){
         value.image = this.url;
       }
       let worker = new Worker(value);
       let customPath = `cooperative/${this.key}/worker`;
       this.workerProvider.customPath(customPath);
       let key = this.workerProvider.save(worker);
       //this.navCtrl.push(CarDetailsPage, {key: key, coop: this.key});
     },
     ()=>{});	
    
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

}
