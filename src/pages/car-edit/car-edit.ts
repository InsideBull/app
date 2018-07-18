import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, CardTitle } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarProvider } from '../../providers/car/car';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { Car } from '../../models/car.model';
import { CarType } from '../../models/car-type.model';
import { CarDetailsPage } from '../car-details/car-details';
import { CameraProvider } from '../../providers/camera/camera';

/**
 * Generated class for the CarEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-edit',
  templateUrl: 'car-edit.html',
})
export class CarEditPage {
  form: FormGroup;
  key: string;
  coop: string;
  cartypes: any;
  car: Car = new Car();
  statusList = ['available', 'breakdown', 'travelling'];
 	nbplace: number = 0;
 	image :any;
   url:any;
   type: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public carProvider: CarProvider,
    public carTypeProvider: CarTypeProvider,
    public cameraProvider: CameraProvider,) {
      this.form = formBuilder.group({
        matricule: ['',Validators.required],			
        cartype: ['',Validators.required],	
        nbplace: [0,Validators.required],	
        status: ['',Validators.required]
      })
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
    this.coop = this.navParams.get('coop');

    let customPath = `cooperative/${this.coop}/car`;
    this.carProvider.customPath(customPath);
    this.carProvider.fetch(this.key).then(
      (data: Car)=>{
        this.car = data;
      }
    );

    this.cartypes = [];
    this.carTypeProvider.fetcAll().subscribe((cartypes)=>{
      for(let key in cartypes){
        cartypes[key].key = key;
        this.cartypes.push(cartypes[key]);
        if(this.car.type == key){
          let notavailable = JSON.parse(cartypes[key]['notavailable']);
          let nbplace = cartypes[key]['nbplace'] - Object.keys(notavailable).length;
          this.nbplace = nbplace;
        }
      }
    });

    this.url = this.car.image;
  }

  getNbplace(cartypeKey: string){
    this.carTypeProvider.fetch(cartypeKey).then((cartype)=>{
      let notavailable = JSON.parse(cartype['notavailable']);
      let nbplace = cartype['nbplace'] - Object.keys(notavailable).length;
      this.nbplace = nbplace;
    })
  }

  onSubmit(){
    let value = this.form.value;
    if(this.url){
      value.image = this.url;
    }
    let car = new Car(value);
    // let customPath = `cooperative/${this.coop}/car`;
    // this.carProvider.customPath(customPath);
    this.carProvider.save(car, this.key);
    this.navCtrl.push(CarDetailsPage, {key: this.key, coop: this.coop});
    
  }

  fromGallery(){
    this.cameraProvider.selectPhoto().then((image)=>{
      this.image = image;
      this.carProvider.uploadImage(this.image).then((url)=>{
        this.url = url;
      })
    })
  }

  fromCamera(){
    this.cameraProvider.takePhoto().then((image)=>{
      this.image = image;
      this.carProvider.uploadImage(this.image).then((url)=>{
        this.url = url;
      })
    })
  }

}
