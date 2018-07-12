import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CooperativeDetailsPage } from '../../pages/cooperative-details/cooperative-details';
import { Cooperative } from '../../models/cooperative.model'


/**
 * Generated class for the CooperativeManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cooperative-manage',
  templateUrl: 'cooperative-manage.html',
})
export class CooperativeManagePage {

	cooperative: Cooperative = new Cooperative();
	param: string;

  constructor(public navCtrl: NavController,
   			  public navParams: NavParams,
   			  public cooperativeProvider: CooperativeProvider) {
	

  	
  }

  ionViewDidLoad() {
  	this.param = this.navParams.get('key');
    this.cooperativeProvider.fetch(this.param).then(
  		(data: Cooperative) => {
  				this.cooperative = data;
  			});
  	
  }

  saveLogo(event){
 		let file = event.target.files[0];
 		this.cooperativeProvider.uploadLogo(file).then((url: string)=>{
 		this.cooperative.logo = url;
 		})
 	}

  onSubmit() {

 			// this.facebookProvider.getUser(['email','name']).then((user)=>{
 			// 	let admin = new Administrator(user);
 			// 	let uid = this.adminProvider.save(admin);
 			// 	let value = this.form.value;
 			// 	let admins = [];
 			// 	admins.push(uid);
 			// 	value.admins = JSON.stringify(admins);
 				
 			// 	let cooperative = new Cooperative(value);
 			// 	this.cooperativeProvider.save(cooperative);

 			// 	this.navCtrl.push(CooperativeListPage);
 			// })		

 			//let cooperative = new Cooperative(this.cooperative);
 			this.cooperativeProvider.save(this.cooperative, this.param);

 			this.navCtrl.push(CooperativeDetailsPage, {'key': this.param});

  }

}
