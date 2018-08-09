import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { AdminRequestProvider } from '../../providers/admin-request/admin-request';
import { NotificationProvider } from '../../providers/notification/notification';
import { CooperativeMenuPage } from '../cooperative-menu/cooperative-menu';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { User } from '../../models/user.model';
import { Administrator } from '../../models/administrator.model';

/**
 * Generated class for the AdminRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-request',
  templateUrl: 'admin-request.html',
})
export class AdminRequestPage {

  uid: any;
  cooperatives: any;
  user: any;
  empty = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public cooperativeProvider: CooperativeProvider, public adminRequestProvider: AdminRequestProvider, public notif: NotificationProvider, private facebookProvider: FacebookProvider) {
    this.uid = this.navParams.get('uid');
    
    this.cooperativeProvider.fetcAll().subscribe((cooperatives) => {
      if(!cooperatives){
        this.empty = true;
      }else{
        this.cooperatives = [];
  
        for(let key in cooperatives){
          cooperatives[key].key = key;    
          this.cooperatives.push(cooperatives[key]);
        }
      }
    });
    this.facebookProvider.getUser().then((user)=>{
      this.user = new Administrator();
			 this.user.name = user['name'];
			 this.user.email = user['email'];
    });
  }

  ionViewDidLoad() {}

  onClickItem(coop){
    let message = "Voulez vous envoyer une demande d'administrateur à la coopérative " + coop.name + " ?";
 		let title = "Demande";
 		this.notif.presentConfirm(message, title).then((confirm)=>{
      let path = `cooperative/${coop.key}/admin_request`;
      this.adminRequestProvider.customPath(path);
      this.adminRequestProvider.save(this.user, this.uid);
 			this.navCtrl.setRoot(CooperativeMenuPage, {uid: this.uid});
 		},()=>{});
  }

}
