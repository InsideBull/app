import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { TrajetDetailPage } from '../trajet-detail/trajet-detail';
/**
 * Generated class for the TrajetListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-list',
  templateUrl: 'trajet-list.html',
})
export class TrajetListPage {

  coop: any;
  loading: any;
  trajets = [];
  empty = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public stationProvider: StationProvider,
    public trajetProvider: TrajetProvider,
    private loadingCtrl: LoadingController) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
   
      this.coop = this.navParams.get('coop');

      let path = `cooperative/${this.coop}/trajet`;
        this.trajetProvider.customPath(path);
        this.trajetProvider.fetcAll().subscribe((data)=>{
          if(data){
            this.trajets = [];
            for(let key in data){
              data[key].key = key;
  
              this.stationProvider.fetch(data[key].depart).then((depart)=>{
                data[key].depart = depart;
              });
  
              this.stationProvider.fetch(data[key].arrive).then((arrive)=>{
                data[key].arrive = arrive;
              });
            }
          }else{
            this.loading.dismiss();
            this.empty = true;
          }
          this.loading.dismiss();
        });
   
  }

  onClickItem(key){
    this.navCtrl.push(TrajetDetailPage, {key: key, coop: this.coop});
  }
  

}
