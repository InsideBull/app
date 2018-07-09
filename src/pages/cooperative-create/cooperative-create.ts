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
	 fileUrl: String;

 	constructor( private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

 		this.form = this.formBuilder.group({
			 name: ['',Validators.required],
			 logo: ['', Validators.required]
 		});
 	}

 	ionViewDidLoad() {
 		
 	}

 	onSubmit(){
 		if(this.form.valid){
 			let value = this.form.value;
 			let cooperative = new Cooperative(value);
 			this.cooperativeProvider.save(cooperative);

 		}
	 }
	 
	 detectFiles(event) {
		this.cooperativeProvider.uploadImgLogo(event.target.files[0]).then(
			(url: string) => {
				console.log(url);
			  	this.fileUrl = url;	  
			  	this.setURLLogo();
			}
		  );
	}

	setURLLogo(){
		this.form.value.logo = this.fileUrl;
	}

 }
