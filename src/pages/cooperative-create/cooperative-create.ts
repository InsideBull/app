import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { AngularFireStorage } from 'angularfire2/storage';
import { Administrator } from '../../models/administrator.model';
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
 	constructor(private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
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
 			this.cooperativeProvider.save(cooperative);
 		}
 	}

 	saveLogo(event){
 		let file = event.target.files[0];
 		this.cooperativeProvider.uploadLogo(file).then((url: string)=>{
 			console.log(url);
 		})
 	}

 }
