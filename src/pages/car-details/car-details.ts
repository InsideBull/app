import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { Car } from '../../models/car.model';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { CarEditPage } from '../car-edit/car-edit';
import { CarListPage } from '../car-list/car-list';
import { NotificationProvider } from '../../providers/notification/notification'

/**
 * Generated class for the CarDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-car-details',
   templateUrl: 'car-details.html',
 })
 export class CarDetailsPage {

   key: any;
   coop: any;
   car: Car = new Car();
   cartype: any;
   rows: string[] = [];
   cols: number[]  = [];
   alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   reserved: string[] = [];
   notavailable: string[] = [];
   nbRows: number;
   nbCols: number;

   constructor( private carProvider: CarProvider, 
     public cartypeProvider: CarTypeProvider,
     public navCtrl: NavController, 
     public navParams: NavParams,
     public notif: NotificationProvider) {
   }

   ionViewDidLoad() {
     this.key = this.navParams.get('key');
     this.coop = this.navParams.get('coop');

     let customPath = `cooperative/${this.coop}/car`;
     this.carProvider.customPath(customPath);

     this.cartype = {};

     this.carProvider.fetch(this.key).then(
       (data: Car)=>{
         this.cartypeProvider.fetch(data.type).then((cartype)=>{
           this.car = data;




           if (!this.car.image) {
             this.car.image = "assets/icon/bus.png";
           }    


           this.cartype = cartype;


           this.showingSeats()
         });
       });
   }


   showingSeats(){

     let _occuped = [];
     let car = this.car;

     if(car.occuped){
       _occuped = JSON.parse(car.occuped);
       for( let key in _occuped ){
         this.reserved.push(_occuped[key]);
       }
       
     }


     let type = this.cartype;    
     this.nbCols = type.nbCols;
     this.nbRows = type.nbRows;
     this.notavailable = JSON.parse(type['notavailable']);
     this.rows = [];
     this.cols = [];
     let refRows = this.alpha.split('');      
     for( let i = 0; i < this.nbRows; i++){
       this.rows.push(refRows[i]);
     }
     for( let j = 0; j < this.nbCols; j++){
       this.cols.push(j);
     } 
     
   }

   getStatus = function(seatPos: string) {

     if( this.notavailable.indexOf(seatPos) !== -1 ){
       return 'notavailable';
     }

     if(this.reserved.indexOf(seatPos) !== -1) {
       return 'reserved';
     } 

   }

   editer(){
     this.navCtrl.push(CarEditPage, {key: this.key, coop: this.coop});
   }

   delete(){
     let message = 'Voulez vous supprimer la voiture N° ' + this.car.matricule + ' ?';
     this.notif.presentConfirm(message).then((confirm)=>{
       this.carProvider.deleteCar(this.key);
       this.navCtrl.push(CarListPage, {key: this.coop});
     },
     (cancel)=>{}
     )
   }

 }
