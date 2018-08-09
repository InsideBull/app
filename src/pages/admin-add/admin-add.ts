import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { Administrator } from '../../models/administrator.model'
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { AdministratorProvider } from '../../providers/administrator/administrator';
import { NotificationProvider } from '../../providers/notification/notification';
import { AdminListPage } from '../admin-list/admin-list'
import { AdminRequestProvider } from '../../providers/admin-request/admin-request';


/**
 * Generated class for the AdminAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-admin-add',
   templateUrl: 'admin-add.html',
 })
 export class AdminAddPage {

   adminRequests: any;
   key: any;
   cooperative: Cooperative = new Cooperative();
   empty = false;

   constructor(private adminProvider: AdministratorProvider, 
    private cooperativeProvider: 
    CooperativeProvider, 
    public adminRequestProvider: AdminRequestProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public notificationProvider: NotificationProvider) {
      this.toConstruct();
   }

   ionViewWillEnter() {

 
   }

   toConstruct(){
    this.key = this.navParams.get('key');
    this.cooperativeProvider.fetch(this.key).then(
      (data: Cooperative) => {
        this.cooperative = data;
      });

    let path = `cooperative/${this.key}/admin_request`;
    this.adminRequestProvider.customPath(path);
    this.adminRequestProvider.fetcAll().subscribe((data)=>{
      this.adminRequests = [];
      if(!data){
        this.empty = true;
      }else{
        for(let key in data){
          data[key].key = key;
          this.adminRequests.push(data[key]);
        }
      }
    });

   }

   addToAdmins(uid, uname){
     let message = 'Voulez vous ajouter ' + uname.name + ' comme administateur de ' + this.cooperative.name + ' ?';
     let title = 'Administrateur';
    this.notificationProvider.presentConfirm(message, title).then((confirm)=>{
      this.confirm(uid, uname);
      this.adminRequestProvider.deleteAdminRequest(uid);
      this.navCtrl.push(AdminListPage, {key:this.key})
    },
    (cancel)=>{});

   }

   protected confirm(uid: any ,uname){
     let admins = []
     admins = JSON.parse(this.cooperative.admins);

     let in_admins = admins.find( id => id == uid );

     if (!in_admins) {
       admins.push(uid);
       this.cooperative.admins = JSON.stringify(admins);
       this.cooperativeProvider.save(this.cooperative,this.key);

       let admin = new Administrator({name: uname.name});

       if (uname.email) {
         admin.email = uname.email
       }
       
       this.adminProvider.save(admin,uid);

     }

     else{
      let message = uname.name + ' est déjà administrateur de ' + this.cooperative.name + ' !';
      let title = 'Administrateur';
      this.adminRequestProvider.deleteAdminRequest(uid);      
      this.notificationProvider.presentAlert(message, title);
   }
  }

  delete(i: any){
		let message = "Voulez vous enlever cette demande d'administrateur à cette coopérative " + this.cooperative.name;
		let title = "Suppression";
	   this.notificationProvider.presentConfirm(message, title).then((confirm)=>{

		  this.adminRequestProvider.deleteAdminRequest(i);
		 this.navCtrl.setRoot(AdminAddPage, {key: this.key});
	   },()=>{});
	  }

 }
