import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';
import { StationManagePage } from '../station-manage/station-manage';
import { StationListPage } from '../station-list/station-list';

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
  station: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public stationProvider: StationProvider,
  public alertCtrl: AlertController) {
  }
 
  ionViewDidLoad() {
    this.param = this.navParams.get('key');
    this.stationProvider.fetch(this.param).then(
      (data)=>{
        this.station = data;
      }
    );
  }
  manageStation(){
    this.navCtrl.push(StationManagePage, {key: this.param});
  }


  delete(){
      
    let alert = this.alertCtrl.create({
      title: 'Suppression',
      message: 'Voulez vous supprimer la station ' + this.station.name + ' ?',
      buttons: [
        {
          text: 'annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'supprimer',
          handler: () => {
            this.stationProvider.deleteStation(this.param);
            this.navCtrl.push(StationListPage);
          }
        }
      ]
    });
    alert.present();
  }

}
