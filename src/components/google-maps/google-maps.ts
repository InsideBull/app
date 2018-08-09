import { Component, Input, OnInit } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, MarkerIcon } from '@ionic-native/google-maps';
import { Coordinate } from '../../classes/coordinate.class';
import { LoadingController, Loading } from 'ionic-angular';
/**
 * Generated class for the GoogleMapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 declare var google;

 @Component({
 	selector: 'google-maps',
 	templateUrl: 'google-maps.html' 
 })
 export class GoogleMapsComponent implements OnInit {

 	text: string;
 	map: GoogleMap;
	 directionsService = new google.maps.DirectionsService();
	 loading: Loading;

 	@Input('position') position: Coordinate;
 	@Input('origin') origin: Coordinate;   
 	@Input('destination') destination: Coordinate;


	 constructor(public loadingCtrl: LoadingController) {
					this.loading = loadingCtrl.create();
					this.initMap();
				}
				
 	ngOnInit(){
 		
 	}

 	initMap(){
 		
 		this.loadMap().then((loaded)=>{
 			
 			if (loaded) {
 				if (this.position) {
 					this.addMarker(this.position);
 				}

 				else{
 					this.addMarker(this.origin);
 					this.addMarker(this.destination, 'destination');
 					this.traceRoute().then((response: any)=>{
 						this.addPolylines(response).then((target)=>{
 							this.moveCamera(target);
 						});
 					})
 				}
			}
			this.loading.dismiss();
		 });
		 
 	}

 	loadMap(){

 		return new Promise ((resolve)=>{
 			let mapOptions: GoogleMapOptions = {
 				camera: {
 					target: this.position || this.origin,
 					zoom: 18,
 					tilt: 30
 				},
 				controls: {
 					compass: false,
 					mapToolbar: false
 				}
 			};

 			this.map = GoogleMaps.create('map_canvas', mapOptions);

 			this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
 				resolve(true);
 			})
 		})

 	}

 	addMarker(position: Coordinate, type?:string){

 		let url = './assets/icon/start-marker.png';
 		
 		if (type == 'destination') {
 			url = './assets/icon/destination-marker.png';
 		}

 		let icon : MarkerIcon = {
 			url: url ,
 			size: {
 				width: 40,
 				height: 40
 			}

 		}

 		let _marker: MarkerOptions = {
 			position: {
 				lat: position.lat,
 				lng: position.lng
 			},
 			icon: icon
 		}

 		this.map.addMarker(_marker)
 		.then((marker)=>{
 			
 		})

 	}

 	traceRoute(){
 		return new Promise((resolve)=>{
 			let request = {
 				origin: this.origin,
 				destination: this.destination,
 				unitSystem: google.maps.UnitSystem.METRIC,
 				travelMode: google.maps.TravelMode.DRIVING,
 			};

 			this.directionsService.route(request, function(result, status){
 				if (status == 'OK') {
 					resolve(result);
 				}
 			})
 		})
 	}

 	addPolylines(response: any){
 		return new Promise ((resolve)=>{
 			let polilynes = [];
 			response.routes[0].overview_path.forEach((position) => {
 				let polilyne = { lat: position.lat(), lng: position.lng() }
 				polilynes.push(polilyne);
 			});

 			let leg = response.routes[0].legs[0];
 			let start = leg.start_location;
 			let end = leg.end_location;
 			let target = [{
 				lat: start.lat(),
 				lng: start.lng()
 			}, {
 				lat: end.lat(),
 				lng: end.lng()
 			}];

 			this.map.addPolyline({
 				points: polilynes,
 				'color' : '#b5ce93',
 				'width': 10,
 				'geodesic': true,
 			}).then(()=>{
 				resolve(target);
 			})
 		})

 	}

 	moveCamera(target){
 		this.map.moveCamera({
 			target: target,
 			zoom: 18
 		})
 	}


 }