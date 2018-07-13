import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/voyage/station';
import { Voyage } from '../../models/voyage.model';
import { VoyageDetailPage } from '../../pages/voyage-detail/voyage-detail';

/**
 * Generated class for the VoyageCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voyage-create',
  templateUrl: 'voyage-create.html',
})
export class VoyageCreatePage {

	form: FormGroup;
	stations: any;
	voyage: Voyage;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public voyageProvider: VoyageProvider,
  	public formBuilder: FormBuilder,
  	public stationProvider: StationProvider) {

  	this.form = this.formBuilder.group({
 			arrivalstation: ['',Validators.required],
 			cooperative: ['', ],
 			date: ['',Validators.required],
 			price: [,Validators.required],
 			startstation: ['',Validators.required]
 		});
  }

  ionViewDidLoad() {
  	this.stations = [];
    this.stationProvider.fetcAll().subscribe(
    	(data) => {
    		for(let key in data){
  				data[key].key = key;
  				this.stations.push(data[key]);
  			}
    	});
  }

  onSubmit(){
  	if(this.form.valid){
  		this.voyage = new Voyage(this.form.value);
  		let key = this.voyageProvider.save(this.voyage);
  		this.navCtrl.push(VoyageDetailPage, {key: key});
  	}
  }


}
