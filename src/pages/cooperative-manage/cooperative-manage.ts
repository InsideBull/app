import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CooperativeDetailsPage } from '../../pages/cooperative-details/cooperative-details';
import { Cooperative } from '../../models/cooperative.model'
import { CameraProvider } from '../../providers/camera/camera';
import { NotificationProvider } from '../../providers/notification/notification';


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
			public notif: NotificationProvider) {
	

  	
  }

  ionViewDidLoad() {
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

  onSubmit() {
	let message = "Voulez vous enregistrer les modifications?"
    let title = "Modification";
    this.notif.presentConfirm(message, title).then((confirm)=>{
		if(this.url){
			this.cooperative.logo = this.url;
		}
		this.cooperativeProvider.save(this.cooperative, this.param);
	
		this.navCtrl.push(CooperativeDetailsPage, {'key': this.param});
	},()=>{});
	
  }

  fromGallery(){
	this.cameraProvider.selectPhoto().then((image)=>{
		this.image = image;
		this.cooperativeProvider.uploadLogo(this.image).then((url)=>{
			this.url = url;
		});
	});
}

fromCamera(){
	this.cameraProvider.takePhoto().then((image)=>{
		this.image = image;
		this.cooperativeProvider.uploadLogo(this.image).then((url)=>{
			this.url = url;
		})
	})
}

}
