import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CooperativeDetailsPage } from '../../pages/cooperative-details/cooperative-details';
import { Cooperative } from '../../models/cooperative.model'
import { CameraProvider } from '../../providers/camera/camera';
import { NotificationProvider } from '../../providers/notification/notification';
import { ImageWidgetPage } from '../image-widget/image-widget';


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
 	image: any;
 	url: any;

 	constructor(public navCtrl: NavController,
 		public navParams: NavParams,
 		public cooperativeProvider: CooperativeProvider,
 		public cameraProvider: CameraProvider,
 		public notif: NotificationProvider,
 		public modalCtrl: ModalController) {
			 
			 this.param = this.navParams.get('key');
			 this.cooperativeProvider.fetch(this.param).then(
				 (data: Cooperative) => {
					 this.cooperative = data;
		
					 if(!this.cooperative.logo){
						 this.cooperative.logo = "assets/icon/copyright.png"
					 }
		
					 this.url = this.cooperative.logo
				 });

 		
 	}

 	ionViewWillEnter() {
 		
 	}

 	onSubmit() {
 		let message = "Voulez vous enregistrer les modifications de " + this.cooperative.name + " ?";
 		let title = "Modification";
 		this.notif.presentConfirm(message, title).then((confirm)=>{
 			if(this.url){
 				this.cooperative.logo = this.url;
 			}
 			this.cooperativeProvider.save(this.cooperative, this.param);
 			
 			this.navCtrl.push(CooperativeDetailsPage, {'key': this.param});
 		},()=>{});
 		
 	}

 	imageWidget(){
 		let modal = this.modalCtrl.create(ImageWidgetPage, null, {cssClass:'pricebreakup' });

 		modal.onDidDismiss(image => {
 			if (image) {
 				this.image = image;
 				this.cooperativeProvider.uploadLogo(this.image).then((url)=>{
 					this.url = url;
 				})
 			}
 		})

 		modal.present();

 	}

 }
