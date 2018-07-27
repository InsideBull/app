import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera'

/**
 * Generated class for the ImageWidgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-image-widget',
 	templateUrl: 'image-widget.html',
 })
 export class ImageWidgetPage {

 	constructor(public navCtrl: NavController, public navParams: NavParams, private cameraProvider: CameraProvider, private viewCtrl: ViewController) {
 	}

 	ionViewWillEnter() {
 		
 	}

 	fromGallery(){
 		this.cameraProvider.selectPhoto().then((image)=>{
 			this.viewCtrl.dismiss(image);
 		})
 	}

 	fromCamera(){
 		this.cameraProvider.takePhoto().then((image)=>{
 			this.viewCtrl.dismiss(image);
 		})
 	}

 }
