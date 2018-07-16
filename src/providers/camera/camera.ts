import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class CameraProvider {

  	constructor(private camera: Camera) {
  	}

  	takePhoto(){
  		return new Promise((resolve)=>{
  			try{

  				let options: CameraOptions = {
  					quality: 100,
  					targetHeight:500,
  					targetWidth:410,
  					destinationType: this.camera.DestinationType.FILE_URI,
  					sourceType: this.camera.PictureSourceType.CAMERA,
  					allowEdit: false,
  					encodingType: this.camera.EncodingType.PNG,
  					saveToPhotoAlbum: false,
  					correctOrientation: true
  				};

  				this.camera.getPicture(options).then((imageURI)=>{
  					resolve(imageURI);
  				},
  				(err)=>{

  				})

  			}
  			catch(error){
  				alert (JSON.stringify(error));
  			}
  		})
  	}

  	selectPhoto(){
  		return new Promise((resolve)=>{

  			let options: CameraOptions = {
  				sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  				destinationType: this.camera.DestinationType.DATA_URL,
  				quality: 100,
  				encodingType: this.camera.EncodingType.PNG,
  			};

  			this.camera.getPicture(options).then((imageURI)=>{
  				resolve(imageURI);
  			},
  			(err)=>{
  				
  			});

  		});
  	}

  }
