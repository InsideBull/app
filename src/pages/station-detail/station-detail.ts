import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';
import { StationManagePage } from '../station-manage/station-manage';
import { StationListPage } from '../station-list/station-list';
import { NotificationProvider } from '../../providers/notification/notification';
import { Station } from '../../models/station.model';
import { Coordinate } from '../../classes/coordinate.class'
import { MapPage } from '../map/map';

/** 
 * Generated class for the StationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-station-detail',
  templateUrl: 'station-detail.html', 
})
export class StationDetailPage {

  param: string;
  station: Station = new Station();
  position : Coordinate;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public stationProvider: StationProvider,
  public notif: NotificationProvider) {
  }
 
  ionViewDidLoad() {
    this.param = this.navParams.get('key');
    this.stationProvider.fetch(this.param).then(
      (data: Station)=>{
        this.station = data;
        this.position = new Coordinate({
          lat: this.station.latitude,
          lng: this.station.longitude
        })
      }
    );
  }
  manageStation(){
    this.navCtrl.push(StationManagePage, {key: this.param});
  }


  delete(){

    let message = 'Voulez vous supprimer la station ' + this.station.name + ' ?';
    let title = 'Suppression';
    this.notif.presentConfirm(message, title).then((confirm)=>{
      this.stationProvider.deleteStation(this.param);
      this.navCtrl.push(StationListPage);
    },()=>{});

  }

  showCarte(){
    this.navCtrl.push(MapPage, {position: this.position});
  }
}
