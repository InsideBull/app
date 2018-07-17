import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GoogleGeolocation } from '../../classes/google-geolocation.class';
import { AlertController, Platform, Events, ViewController } from 'ionic-angular';
import { Address } from '../../classes/address.class';
import { StationProvider } from '../../providers/station/station';
import { Station } from '../../models/station.model';

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
 	constructor(private stationProvider: StationProvider, public alertCtrl:AlertController, public platform:Platform, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
 		super(alertCtrl,platform)
 		this.form = this.formBuilder.group({
 			name: ['',Validators.required],			
 			city: ['',Validators.required],	
 			location: ['',Validators.required],		

 		});
 	}

 	ionViewDidLoad() {
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
 		if(this.form.valid){
 			let value = this.form.value;
 			value.city = this.city.location;
 			value.location = this.location.location;
 			value.longitude = this.location.longitude;
 			value.latitude = this.location.latitude;
 			let station = new Station(value);
 			this.stationProvider.save(station);
 		}
 	}

 }