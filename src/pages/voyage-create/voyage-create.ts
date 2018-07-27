import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/station/station';
import { Voyage } from '../../models/voyage.model';
import { VoyageDetailPage } from '../../pages/voyage-detail/voyage-detail';
import {CooperativeProvider } from '../../providers/cooperative/cooperative'
import {Cooperative } from '../../models/cooperative.model'
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the VoyageCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-voyage-create',
   templateUrl: 'voyage-create.html',
 })
 export class VoyageCreatePage {

   form: FormGroup;
   stations: any;
   voyage: Voyage;
   param : any;
   cooperative: Cooperative = new Cooperative();
   min: any;
   max: any;

   constructor(public navCtrl: NavController, 
     public navParams: NavParams,
     public voyageProvider: VoyageProvider,
     public formBuilder: FormBuilder,
     public stationProvider: StationProvider,
     public cooperativeProvider: CooperativeProvider,
      public notif: NotificationProvider) {

     this.form = this.formBuilder.group({
       arrivalstation: ['',Validators.required],
       cooperative: ['', ],
       date: [Date,Validators.required],
       price: [,Validators.required],
       startstation: ['',Validators.required]
     });
     this.toConstruct();

   }

   ionViewWillEnter() {
     
     
  }
  
  toConstruct(){
    this.stations = [];    
  
    this.param = this.navParams.get('key');
  
    this.cooperativeProvider.fetch(this.param).then(
      (data: Cooperative) => { 
        this.cooperative = data;
      });
  
    this.stationProvider.fetcAll().subscribe(
      (data) => {
        for(let key in data){
          data[key].key = key;
          this.stations.push(data[key]);
        }
      });
  
      this.min = this.monent().toISOString();
      let max = this.monent(); 
      max.setDate(max.getDate()+365);
      this.max = max.toISOString(); 
    
   }

   onSubmit(){
    let message = "Voulez vous créer ce voyage ?";
    let title = "Création voyage";
    this.notif.presentConfirm(message, title).then((confirm)=>{
      if(this.form.valid){

        this.form.value.cooperative = this.param;
 
        this.voyage = new Voyage(this.form.value);
 
        let key = this.voyageProvider.save(this.voyage);
        this.navCtrl.push(VoyageDetailPage, {key: key, coop: this.param});
      } 
    },()=>{})
   }

   monent(){
     return new Date();
   }


 }
