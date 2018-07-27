import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, CardTitle, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarProvider } from '../../providers/car/car';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { Car } from '../../models/car.model';
import { CarType } from '../../models/car-type.model';
import { CarDetailsPage } from '../car-details/car-details';
import { CameraProvider } from '../../providers/camera/camera';
import { NotificationProvider } from '../../providers/notification/notification';
import { StatusCars } from '../../models/statusCar.model';
import { ImageWidgetPage } from '../image-widget/image-widget';

/**
 * Generated class for the CarEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-car-edit',
   templateUrl: 'car-edit.html',
 })
 export class CarEditPage {
   form: FormGroup;
   key: string;
   coop: string;
   cartypes: any;
   car: Car = new Car();
   statusList = new StatusCars().statusList;
   nbplace: number = 0;
   image :any;
   url:any;
   type: any;

   constructor(public navCtrl: NavController, 
     public modalCtrl: ModalController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public carProvider: CarProvider,
     public carTypeProvider: CarTypeProvider,
     public cameraProvider: CameraProvider,
     public notif: NotificationProvider) {
     this.form = formBuilder.group({
       matricule: ['',Validators.required],			
       cartype: ['',Validators.required],	
       nbplace: [0,Validators.required],	
       status: ['',Validators.required]
     })
   }

   ionViewWillEnter() {
     this.key = this.navParams.get('key');
     this.coop = this.navParams.get('coop');

     let customPath = `cooperative/${this.coop}/car`;
     this.carProvider.customPath(customPath);
     this.carProvider.fetch(this.key).then(
       (data: Car)=>{
         this.car = data;
         if (!this.car.image) {
           this.car.image = "assets/icon/bus.png";
         }
         this.url = this.car.image;
       }
       );

     this.cartypes = [];
     this.carTypeProvider.fetcAll().subscribe((cartypes)=>{
       for(let key in cartypes){
         cartypes[key].key = key;
         this.cartypes.push(cartypes[key]);
         if(this.car.cartype == key){
           let notavailable = JSON.parse(cartypes[key]['notavailable']);
           let nbplace = cartypes[key]['nbplace'] - Object.keys(notavailable).length;
           this.nbplace = nbplace;
         }
       }
     });    
   }

   getNbplace(cartypeKey: string){
     this.carTypeProvider.fetch(cartypeKey).then((cartype)=>{
       let notavailable = JSON.parse(cartype['notavailable']);
       let nbplace = cartype['nbplace'] - Object.keys(notavailable).length;
       this.nbplace = nbplace;
     })
   }

   onSubmit(){
     let message = "Voulez vous enregistrer les modifications pour la voiture N° " + this.form.value.matricule + " ?"
     let title = "Modification";
     this.notif.presentConfirm(message, title).then((confirm)=>{
       let value = this.form.value;
       if(this.url){
         value.image = this.url;
       }
       let car = new Car(value);
       this.carProvider.save(car, this.key);
       this.navCtrl.push(CarDetailsPage, {key: this.key, coop: this.coop});
     },()=>{});


   }

   fromGallery(){
     this.cameraProvider.selectPhoto().then((image)=>{
       this.image = image;
       this.carProvider.uploadImage(this.image).then((url)=>{
         this.url = url;
       })
     })
   }


   imageWidget(){
     let modal = this.modalCtrl.create(ImageWidgetPage, null, {cssClass:'pricebreakup' });

     modal.onDidDismiss(image => {
       if (image) {
         this.image = image;
          this.carProvider.uploadImage(this.image).then((url)=>{
         this.url = url;
       })
       }
     })

     modal.present();

   }

 }
