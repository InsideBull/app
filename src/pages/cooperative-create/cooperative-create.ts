import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { AngularFireStorage } from 'angularfire2/storage';
import { Administrator } from '../../models/administrator.model';
import { AdministratorProvider } from '../../providers/administrator/administrator';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { CooperativeListPage } from '../../pages/cooperative-list/cooperative-list';



/**
 * Generated class for the CooperativeCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-cooperative-create',
 	templateUrl: 'cooperative-create.html',
 })
 export class CooperativeCreatePage {

 	form: FormGroup;
 	constructor(private adminProvider: AdministratorProvider, 
 		private facebookProvider: FacebookProvider, 
 		private cooperativeProvider: CooperativeProvider, 
 		public navCtrl: NavController, 
 		public navParams: NavParams, 
 		public formBuilder: FormBuilder) {
 		this.form = this.formBuilder.group({
 			name: ['',Validators.required],
 			logo: ''			
 		});
 	}

 	ionViewDidLoad() {

 	}

 	onSubmit(){
 		if(this.form.valid){
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

 			this.cooperativeProvider.save(this.form.value);

 			this.navCtrl.push(CooperativeListPage);


 		}
 	}

 	saveLogo(event){
 		let file = event.target.files[0];
 		this.cooperativeProvider.uploadLogo(file).then((url: string)=>{
 			this.form.value.logo = url;
 		})
 	}

 }
