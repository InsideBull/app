import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';

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

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public voyageProvider: VoyageProvider,
  	public formBuilder: FormBuilder) {

  	this.form = this.formBuilder.group({
 			arrivalstation: ['',Validators.required],
 			cooperative: ['',Validators.required],
 			date: ['',Validators.required],
 			price: [,Validators.required],
 			reservation: ['',Validators.required],	
 			startstation: ['',Validators.required]		
 		});
  }

  ionViewDidLoad() {
    
  }

  

}
