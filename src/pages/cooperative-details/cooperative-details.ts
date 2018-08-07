import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { CooperativeManagePage } from '../../pages/cooperative-manage/cooperative-manage';
import { ParametersPage } from '../parameters/parameters';

import { VoyageMenuPage } from '../voyage-menu/voyage-menu';
import { CarMenuPage } from '../car-menu/car-menu';
import { WorkerMenuPage } from '../worker-menu/worker-menu';
import { CooperativeListPage } from '../cooperative-list/cooperative-list';
import { NotificationProvider } from '../../providers/notification/notification';
import { EventProvider } from '../../providers/event/event';
import { TrajetMenuPage } from '../trajet-menu/trajet-menu';
import { BookingClassMenuPage } from '../booking-class-menu/booking-class-menu';
import { PlanningMenuPage } from '../planning-menu/planning-menu';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the CooperativeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-cooperative-details',
   templateUrl: 'cooperative-details.html',
 })
 export class CooperativeDetailsPage {

   cooperative: Cooperative = new Cooperative();
   param: string;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
    public cooperativeProvider: CooperativeProvider,
    public alertCtrl:AlertController,
    private toastCtrl: ToastController,
    private notif: NotificationProvider,
    public events: Events,
    public eventProvider: EventProvider) {
      this.param = this.navParams.get('key');
    
      this.cooperativeProvider.fetch(this.param).then(
        (data: Cooperative) => {
            this.cooperative = data; 
            if(!this.cooperative.logo){
              this.cooperative.logo = "assets/icon/copyright.png";
            }
              this.eventProvider.setEvent('paramWorker', {key: this.param});
              this.eventProvider.setEvent('paramCar', {key: this.param});
              // this.eventProvider.setEvent('parmCoopDetail', {key: this.param, name: this.cooperative.name});
              this.eventProvider.setEvent('parmVoyageMenu', {key: this.param});
              this.eventProvider.setEvent('parmTrajetMenu', {key: this.param});
              this.eventProvider.setEvent('parmPlannigMenu', {key: this.param});
          }); 
        }
        
        ionViewWillEnter() {
          
  }

   goToManage(){
     this.navCtrl.push(CooperativeManagePage, {key: this.param});
   }

   goToParams(){
     this.navCtrl.push(ParametersPage, {key: this.param});
   }

  //  goToVoyage(){
  //    this.navCtrl.push(VoyageMenuPage, {key: this.param});
  //  }

   goToTrajet(){
     this.navCtrl.push(TrajetMenuPage, {key: this.param});
   }

   goToBookingClass(){
     this.navCtrl.push(BookingClassMenuPage, {key: this.param});
   }

   goToCar(){
     this.navCtrl.push(CarMenuPage, {key: this.param});
   }

   goToWorker(){
     this.navCtrl.push(WorkerMenuPage, {key: this.param});
   }
   goToPlannig (){
    this.navCtrl.push(PlanningMenuPage, {key: this.param});
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage, {key: this.param});
  }

   delete(){
     let title = 'Suppression';
     let message = 'Voulez vous supprimer la cooperative ' + this.cooperative.name + ' ?';
     this.notif.presentConfirm(message, title).then((confirm)=>{
       if(this.cooperative.logo == "assets/icon/copyright.png"){
         this.cooperativeProvider.deleteLogo(this.cooperative.logo);
       }
       this.cooperativeProvider.deleteCooperative(this.param);
       this.navCtrl.push(CooperativeListPage);
     },()=>{})
     
   }

   goToPlanningMenu(){
     
   }

 }