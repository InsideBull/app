import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Cooperative } from '../../models/cooperative.model';
import { Administrator } from '../../models/administrator.model';

import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { AdministratorProvider } from '../../providers/administrator/administrator';
import { FacebookProvider } from '../../providers/facebook/facebook';



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
 	constructor( private facebookProvider: FacebookProvider, private adminProvider: AdministratorProvider, private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
 		this.form = this.formBuilder.group({
 			name: ['',Validators.required],
 		});
 	}

 	ionViewDidLoad() {
 		
 	}

 	onSubmit(){
 		if(this.form.valid){
 			let value = this.form.value;
 			let cooperative = new Cooperative(value);
 			let key = this.cooperativeProvider.save(cooperative);

 			//
 			let path = `cooperative/${key}/admin`;
 			this.adminProvider.setPath(path);
 			this.facebookProvider.getUser(['name','email']).then((user: Administrator)=>{
 				this.adminProvider.save(user);
 			})
 		}
 	}

 }
