import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/station/station';
import { Station } from '../../models/station.model';
import { VoyageManagePage } from '../../pages/voyage-manage/voyage-manage';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { Voyage } from '../../models/voyage.model';
import { VoyageParametersPage } from '../voyage-parameters/voyage-parameters'
import { VoyageListPage } from '../voyage-list/voyage-list';


/**
 * Generated class for the VoyageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voyage-detail',
  templateUrl: 'voyage-detail.html',
})
export class VoyageDetailPage {

	param: string;
  voyage: Voyage = new Voyage();
  startstation: Station = new Station();
  arrivalstation: Station = new Station();
  cooperative: Cooperative = new Cooperative();
  coop: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public stationProvider: StationProvider,
		public voyageProvider: VoyageProvider,
    public cooperativeProvider: CooperativeProvider,
  public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    this.param = this.navParams.get('key');
    this.coop = this.navParams.get('coop');

    this.showDetails();

    }


    showDetails(){
      
      this.voyageProvider.fetch(this.param).then((voyage: Voyage)=>{
        this.voyage = voyage;

        let startstation = this.voyage.startstation;

        let arrivalstation = this.voyage.arrivalstation;

        let cooperative$ = this.voyage.cooperative;

        this.stationProvider.fetch(startstation).then((start: Station)=>{
          this.startstation = start;
        })
        .then(()=>{
          this.stationProvider.fetch(arrivalstation).then((arrival: Station)=>{
            this.arrivalstation = arrival;
          })
        })
        .then(()=>{
          this.cooperativeProvider.fetch(cooperative$).then((cooperative: Cooperative)=>{
            this.cooperative = cooperative;
          })
        })

      })
    }


    goToParameters(){
      this.navCtrl.push(VoyageParametersPage, {key: this.param});
    }

    delete(){
      
      let alert = this.alertCtrl.create({
        title: 'Alert',
        message: 'Voulez vous supprimer ce voyage ?',
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
              this.voyageProvider.deleteVoyage(this.param);
              this.navCtrl.push(VoyageListPage, {key: this.coop});
            }
          }
        ]
      });
      alert.present();
    }

  }
