import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';


/**
 * Generated class for the DeviceScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-device-scanner',
 	templateUrl: 'device-scanner.html',
 })
 export class DeviceScannerPage {

 	content: any;
 	stop: boolean = false;
 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {

 		this.getDataToScanner();

 	}


 	getDataToScanner(){
 		window.addEventListener('keypress',(event)=>{



 			console.log(event.key,event.which,event.code, event.keyCode, event.charCode);


 			if (event.keyCode != 13) {
 				if (this.content) {
 					this.content += String.fromCharCode(event.which)
 				}
 				else{
 					this.content = String.fromCharCode(65);
 				}
 			}
 			else{
 				this.stop = true;
 			}


 		}, true)
 	}

 	toAzerty(key: KeyboardEvent){

 	}


 }
