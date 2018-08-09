import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { NotificationProvider } from '../../providers/notification/notification';
import { TrajetListPage } from '../trajet-list/trajet-list';
import { TrajetParametersPage } from '../trajet-parameters/trajet-parameters';
import { MapPage } from '../map/map';
import { Coordinate } from '../../classes/coordinate.class';

/**
 * Generated class for the TrajetDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-detail',
  templateUrl: 'trajet-detail.html',
})
export class TrajetDetailPage {

  coop: any;
  key:any;
  trajet: any;
  origin: any;
  destination: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public stationProvider: StationProvider, public trajetProvider: TrajetProvider, public notif: NotificationProvider) {
    this.coop = this.navParams.get('coop');
    this.key = this.navParams.get('key');
    let path = `cooperative/${this.coop}/trajet`;
    this.trajetProvider.customPath(path);
    this.trajetProvider.fetch(this.key).then((trajet)=>{
      this.trajet = trajet;
      this.stationProvider.fetch(this.trajet.depart).then((data)=>{
        this.trajet.depart = data;
        this.origin = new Coordinate({lat: data['latitude'], lng: data['latitude']});
      });
      this.stationProvider.fetch(this.trajet.arrive).then((data)=>{
        this.trajet.arrive = data;
        this.destination = new Coordinate({lat: data['latitude'], lng: data['latitude']});
      });
    });
  }

  ionViewDidLoad() { 
  }

  goToParameters(){
    this.navCtrl.push(TrajetParametersPage, {key: this.key, coop: this.coop});
  }

  delete(){
    let message : 'Voulez vous supprimer ce trajet ?'; 
    let title = 'Suppression';

    this.notif.presentConfirm(message, title).then((confirm)=>{
      this.trajetProvider.deleteTrajet(this.key);
      this.navCtrl.push(TrajetListPage, {coop: this.coop});
    },()=>{});
  }

  showCarte(){
    this.navCtrl.push(MapPage, {origin: this.origin, destination: this.destination});
  }

}
