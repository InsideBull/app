import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';
import { GoogleGeolocation } from '../../classes/google-geolocation.class';
import { Address } from '../../classes/address.class';
import { StationDetailPage } from '../station-detail/station-detail';
import { Station } from '../../models/station.model';
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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public stationProvider: StationProvider, 
    public alertCtrl: AlertController, 
    public platform: Platform,
    public notif: NotificationProvider) {
    super(alertCtrl, platform);
    this.station = {};
    this.param = this.navParams.get('key');
    this.stationProvider.fetch(this.param).then(
      (data)=>{
        this.station = data;
      }
    );
  } 

  ionViewWillEnter() {

  }


  tapCity(){
    this.verifyGoogle().then((verified)=>{

      let input_city: any = this.autocomplete('#city input');
      input_city.setComponentRestrictions({'country': ['mg']});

      google.maps.event.addListener(input_city, 'place_changed', () => {
        let place = input_city.getPlace();
        this.cityGoogle = new Address(place);
      });

    });
  }

  tapLocation(){
    this.verifyGoogle().then((verified)=>{ 
    
      let input_location: any = this.autocomplete('#location input');
      input_location.setComponentRestrictions({'country': ['mg']});
  
      google.maps.event.addListener(input_location, 'place_changed', () => {
        let place = input_location.getPlace();
        this.locationGoogle = new Address(place);
      });
  
    });
    
  }

  onSubmit(){

    let message = "Voulez vous enregistrer les modifications de la station " + this.station.name + " ?";
    let title = "Modification";
    this.notif.presentConfirm(message, title).then((confirm)=>{

      if(this.cityGoogle){
        this.station.city = this.cityGoogle.location;       
      }
      if(this.locationGoogle){
        this.station.location = this.locationGoogle.location;
        this.station.longitude = this.locationGoogle.longitude;
        this.station.latitude = this.locationGoogle.latitude;
      }

        let station = new Station(this.station);
        this.stationProvider.save(station, this.param);
        this.navCtrl.setRoot(StationDetailPage, {key: this.param});

    },()=>{});
 
      
  }

}
