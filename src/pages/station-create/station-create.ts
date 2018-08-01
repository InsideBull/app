import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GoogleGeolocation } from '../../classes/google-geolocation.class';
import { Platform, Events, ViewController } from 'ionic-angular';
import { Address } from '../../classes/address.class';
import { StationProvider } from '../../providers/station/station';
import { Station } from '../../models/station.model';
import { NotificationProvider } from '../../providers/notification/notification';
import { StationDetailPage } from '../station-detail/station-detail';

/**
 * Generated class for the StationCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google;

 @IonicPage()
 @Component({
 	selector: 'page-station-create',
 	templateUrl: 'station-create.html',
 })
 export class StationCreatePage extends GoogleGeolocation{

 	form: FormGroup;
 	city: Address;
 	location: Address;
 	constructor(private stationProvider: StationProvider, public notif: NotificationProvider, public platform:Platform, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public alertCtrl: AlertController) {
 		super( alertCtrl, platform);
 		this.form = this.formBuilder.group({
 			name: ['',Validators.required],			
 			city: ['',Validators.required],	
 			location: ['',Validators.required],		

 		});
	}
	
	ionViewDidLoad(){
		this.prepareAutocompletion();
	  
 	}

 	prepareAutocompletion(){
 		this.verifyGoogle().then((verified)=>{

 			let input_city: any = this.autocomplete('#city input');
 			input_city.setComponentRestrictions({'country': ['mg']});

 			google.maps.event.addListener(input_city, 'place_changed', () => {
 				let place = input_city.getPlace();
 				this.city = new Address(place);
 			});

 			let input_location: any = this.autocomplete('#location input');
 			input_location.setComponentRestrictions({'country': ['mg']});

 			google.maps.event.addListener(input_location, 'place_changed', () => {
 				let place = input_location.getPlace();
 				this.location = new Address(place);
 			});

 		})
 	}

 	onSubmit(){
		 let message = "Voulez vous ajouter la station" + this.form.value.name + " ?";
		 let title = "Ajout";
		this.notif.presentConfirm(message, title).then((confirm)=>{
			if(this.form.valid){
				let value = this.form.value;
				value.city = this.city.location;
				value.location = this.location.location;
				value.longitude = this.location.longitude;
				value.latitude = this.location.latitude;
				let station = new Station(value);
				let key = this.stationProvider.save(station);
				this.navCtrl.push(StationDetailPage, {key: key});
			}
		}, ()=>{}); 		
 	}

 }
