import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { App } from 'ionic-angular';

/*
  Generated class for the QrScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class QrScannerProvider {

  	constructor(public qrScanner: QRScanner, private app: App) {

  	}

  	showCamera() {
  		(window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  	}

  	hideCamera() {
  		(window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  	}

  	openScaner(push:any){
  		this.qrScanner.prepare().then((status: QRScannerStatus)=>{

  			if (status.authorized) {
  				
  				this.showCamera();

  				let scanSub = this.qrScanner.scan().subscribe((data)=>{

  					//this.scanned(data);
  					this.hideCamera();

            this.qrScanner.hide();

            scanSub.unsubscribe();


  					this.app.getActiveNav().push(push,{qrcode:data});
  					
  				});

  				this.qrScanner.resumePreview();
  				this.qrScanner.show()
  				.then((data: QRScannerStatus)=>{

  				},
  				err =>{
  					alert(err)
  				});
  			}
  		})
  		.catch((error: any)=>{
  			alert(error)
  		})
  	}

  	scanned(data: any) {
  		window.open(data, '_blank');
  	}

  }
