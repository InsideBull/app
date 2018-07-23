import { Component, Input, OnInit } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, MarkerIcon } from '@ionic-native/google-maps';
import { Coordinate } from '../../classes/coordinate.class';
import { Platform } from 'ionic-angular';
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

 	@Input('position') position: Coordinate;
 	@Input('origin') origin: Coordinate;
 	@Input('destination') destination: Coordinate;


 	constructor(private platform: Platform) {
 		this.platform.ready().then(()=>{
 			this.loadMap();
 		})
 	}

 	ngOnInit(){
 		this.initMap();
 	}

 	initMap(){
 		
 		this.loadMap().then((loaded)=>{
 			
 			if (loaded) {
 				if (this.position) {
 					this.addMarker(this.position);
 				}

 				else{
 					this.addMarker(this.origin);
 					this.addMarker(this.destination);
 					this.traceRoute().then((response: any)=>{
 						this.addPolylines(response).then((target)=>{
 							this.moveCamera(target);
 						});
 					})
 				}
 			}
 		})

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

 	addMarker(position: Coordinate){

 		let icon : MarkerIcon = {
 			url: 'assets/icon/marker.png'
 		}

 		let _marker: MarkerOptions = {
 			position: position,
 			icon: icon
 		}
 		
 		this.map.addMarker(_marker)
 		.then((marker)=>{
 			alert('marker is added')
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
 				'color' : '#051a27',
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
