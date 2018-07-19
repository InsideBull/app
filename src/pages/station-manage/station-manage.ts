import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';
import { GoogleGeolocation } from '../../classes/google-geolocation.class';
import { Address } from '../../classes/address.class';
import { StationDetailPage } from '../station-detail/station-detail';
import { Station } from '../../models/station.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the StationManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google;
@IonicPage()
@Component({
  selector: 'page-station-manage',
  templateUrl: 'station-manage.html',
})
export class StationManagePage extends GoogleGeolocation{

  param: string;
  station: any;
  cityGoogle: any;
  locationGoogle: any;
  form: FormGroup;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public stationProvider: StationProvider, 
    public alertCtrl: AlertController, 
    public platform: Platform,
    public formBuilder: FormBuilder,
    public notif: NotificationProvider) {
    super(alertCtrl, platform);
    this.form = this.formBuilder.group({
      name: ['',Validators.required],			
 			city: ['',Validators.required],	
 			location: ['',Validators.required]
    })
  } 

  ionViewDidLoad() {
    this.station = {};
    this.param = this.navParams.get('key');
    this.stationProvider.fetch(this.param).then(
      (data)=>{
        this.station = data;
        console.log(this.station);
      }
    );

  }

  prepareAutocompletion(){
    this.verifyGoogle().then((verified)=>{

      let input_city: any = this.autocomplete('#city input');
      input_city.setComponentRestrictions({'country': ['mg']});

      google.maps.event.addListener(input_city, 'place_changed', () => {
        let place = input_city.getPlace();
        this.cityGoogle = new Address(place);
      });

      let input_location: any = this.autocomplete('#location input');
      input_location.setComponentRestrictions({'country': ['mg']});

      google.maps.event.addListener(input_location, 'place_changed', () => {
        let place = input_location.getPlace();
        this.locationGoogle = new Address(place);
      });

    });
  }

  onChange(){
    this.prepareAutocompletion();
  }

  onSubmit(){

    let message = "Voulez vous enregistrer les modifications?"
    let title = "Modification";
    this.notif.presentConfirm(message, title).then((confirm)=>{
      if(this.form.valid){
        let value = this.form.value;
        value.city = this.cityGoogle.location;
        value.location = this.locationGoogle.location;
        value.longitude = this.locationGoogle.longitude;
        value.latitude = this.locationGoogle.latitude;
        let station = new Station(value);
        this.stationProvider.save(station, this.param);
        this.navCtrl.push(StationDetailPage, {key: this.param});
      }
    },()=>{});
 
      
  }

}
