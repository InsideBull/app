import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminListPage } from '../admin-list/admin-list';
import { AdminAddPage } from '../admin-add/admin-add';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';

/**
 * Generated class for the ParametersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-parameters',
   templateUrl: 'parameters.html',
 })
 export class ParametersPage {

   key:any;
   cooperative: Cooperative = new Cooperative();
   constructor(private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams) {

   }

   ionViewWillEnter() {
     this.key = this.navParams.get('key');
     this.cooperativeProvider.fetch(this.key).then(
       (data: Cooperative) => {
         this.cooperative = data;
         if(!this.cooperative.logo){
           this.cooperative.logo = "assets/icon/copyright.png";
         }
       });
   }

   listAdmin(){
     this.navCtrl.push(AdminListPage, {key:this.key});
   }

   addAdmin(){
     this.navCtrl.push(AdminAddPage, {key:this.key});
   }

 }
