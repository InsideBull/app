import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { AngularFireStorage } from 'angularfire2/storage';
import { Administrator } from '../../models/administrator.model';
import { AdministratorProvider } from '../../providers/administrator/administrator';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { CooperativeDetailsPage } from '../../pages/cooperative-details/cooperative-details';
import { CameraProvider } from '../../providers/camera/camera';
import { CarProvider } from '../../providers/car/car';
import { NotificationProvider } from '../../providers/notification/notification';
import { ImageWidgetPage } from '../image-widget/image-widget'



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

 	admins: string[] = [];
 	url: any;
 	image: any;

 	constructor(
 		private modalCtrl: ModalController,
 		private adminProvider: AdministratorProvider, 
 		private facebookProvider: FacebookProvider, 
 		private cooperativeProvider: CooperativeProvider, 
 		public navCtrl: NavController, 
 		public navParams: NavParams, 
 		public formBuilder: FormBuilder,
 		public cameraProvider: CameraProvider,
 		public notif: NotificationProvider
 		) {

 		this.form = this.formBuilder.group({
 			name: ['',Validators.required],
			logo: '',
			desc:['', Validators.required],
			nameContact:['',Validators.required],
			telContact:['', Validators.required],
			addrContact: ['', Validators.required]		
 		});
 		
 	}

 	ionViewWillEnter() {
 		this.url = "assets/icon/camera.png";
 	}

 	onSubmit(){
 		let message = "Voulez-vous créer la cooperative " + this.form.value.name + " ?";

 		let title = "Ajout cooperative";
 		this.notif.presentConfirm(message, title).then(
 			(confirm)=>{
 				if(this.form.valid){
 					this.facebookProvider.getUser().then((user)=>{

 						let uid = user['id']; 
 						let value = this.form.value;
 						value.logo = this.url;
 						value.status = false;

 						this.admins.push(uid);
 						value.admins = JSON.stringify(this.admins);

 						let cooperative = new Cooperative(value);

 						let key = this.cooperativeProvider.save(cooperative);

 						this.navCtrl.setRoot(CooperativeDetailsPage, {key:key});
 					});		

 				}
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
