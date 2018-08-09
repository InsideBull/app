import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { StationProvider } from '../../providers/station/station';
import { NotificationProvider } from '../../providers/notification/notification';
import { TrajetProvider } from '../../providers/trajet/trajet';
import { Traject } from '../../models/traject.model';
import { TrajetDetailPage } from '../trajet-detail/trajet-detail';

/**
 * Generated class for the TrajetCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-create',
  templateUrl: 'trajet-create.html',
})
export class TrajetCreatePage {

  coop: any;
  form: FormGroup;
  stations: any;
  cooperative: Cooperative = new Cooperative();

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public cooperativeProvider: CooperativeProvider, public stationProvider: StationProvider, public notif: NotificationProvider, public trajetProvider: TrajetProvider) {
    this.form = this.formBuilder.group({
      depart:['', Validators.required],
      arrive:['', Validators.required]
    });
    this.stations = [];
    this.coop = this.navParams.get('coop');
    this.cooperativeProvider.fetch(this.coop).then(
      (data: Cooperative) => { 
        this.cooperative = data;
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
    let message = "Voulez vous enregistrer ce trajet ?";
    let title = "Création de trajet";
    this.notif.presentConfirm(message, title).then((confirm)=>{
      if(this.form.valid){
        let path = `cooperative/${this.coop}/trajet`;
        this.trajetProvider.customPath(path);
        let trajet = new Traject(this.form.value);
        let key = this.trajetProvider.save(trajet);
        this.navCtrl.setRoot(TrajetDetailPage, {key: key, coop: this.coop});
      }
    })
  }

}
