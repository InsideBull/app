import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { Administrator } from '../../models/administrator.model'
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { AdministratorProvider } from '../../providers/administrator/administrator';
import { NotificationProvider } from '../../providers/notification/notification';
import { AdminListPage } from '../admin-list/admin-list'


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

   myFriends: any;
   key: any;
   cooperative: Cooperative = new Cooperative();

   constructor(private adminProvider: AdministratorProvider, 
    private cooperativeProvider: 
    CooperativeProvider, 
    private facebookProvider: FacebookProvider, 
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

    this.myFriends = [];
    this.facebookProvider.getUserFriends().then((friends)=>{

      for(let key in friends){
        this.myFriends.push(friends[key])
      }


    })
   }

   addToAdmins(uid, uname){
     let message = 'Voulez vous ajouter ' + uname + ' comme administateur de ' + this.cooperative.name + ' ?';
     let title = 'Administrateur';
    this.notificationProvider.presentConfirm(message, title).then((confirm)=>{
      this.confirm(uid, uname);
      this.navCtrl.push(AdminListPage, {key:this.key})
    },
    (cancel)=>{});

   }

   protected confirm(uid: any ,name: string, email?: string){
     let admins = []
     admins = JSON.parse(this.cooperative.admins);

     let in_admins = admins.find( id => id == uid );

     if (!in_admins) {
       admins.push(uid);
       this.cooperative.admins = JSON.stringify(admins);
       this.cooperativeProvider.save(this.cooperative,this.key);

       let admin = new Administrator({name: name});

       if (email) {
         admin.email = email
       }
       
       this.adminProvider.save(admin,uid);

     }

     else{
      let message = name + ' est déjà administrateur de ' + this.cooperative.name + ' !';
      let title = 'Administrateur';
      
      this.notificationProvider.presentAlert(message, title);
   }



  }

 }
