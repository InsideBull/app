import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { Traject } from '../../models/traject.model';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { StationProvider } from '../../providers/station/station';
import { NotificationProvider } from '../../providers/notification/notification';
import { TrajetDetailPage } from '../trajet-detail/trajet-detail';

/**
 * Generated class for the TrajetEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-edit',
  templateUrl: 'trajet-edit.html',
})
export class TrajetEditPage {

  key: any;
  coop: any;
  trajet: Traject = new Traject();
  stations: any;
  cooperative: Cooperative = new Cooperative(); 

  constructor(public navCtrl: NavController, public navParams: NavParams, public trajetProvider: TrajetProvider, public cooperativeProvider: CooperativeProvider, public stationProvider: StationProvider, public notif: NotificationProvider) {
    this.stations = [];
    this.coop = this.navParams.get('coop');
    this.key = this.navParams.get('key');
    this.cooperativeProvider.fetch(this.coop).then(
      (data: Cooperative) => { 
        this.cooperative = data;
      });
      
      this.stations = [];
    this.stationProvider.fetcAll().subscribe(
      (data) => {
        for(let key in data){
          data[key].key = key;
          this.stations.push(data[key]);
        }
      });

      let path = `cooperative/${this.coop}/trajet`;
      this.trajetProvider.customPath(path);
      this.trajetProvider.fetch(this.key).then((data: Traject)=>{
        this.trajet = data;
      });

      this.stationProvider.fetcAll().subscribe(
        (data) => {
          for(let key in data){
            data[key].key = key;
            this.stations.push(data[key]);
          }
        });

  }

  ionViewDidLoad() {
    
  }

  onSubmit(){
    let message = "Voulez vous modifier ce trajet ?";
    let title = "Modification";
    this.notif.presentConfirm(message, title).then((confirm)=>{
        let key = this.trajetProvider.save(this.trajet, this.key);
        this.navCtrl.setRoot(TrajetDetailPage, {key: key, coop: this.coop});
    });
  }

}
