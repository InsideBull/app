import { Component, Input, OnInit } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Coordinate } from '../../classes/coordinate.class';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the GoogleMapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 @Component({
 	selector: 'google-maps',
 	templateUrl: 'google-maps.html' 
 })
 export class GoogleMapsComponent implements OnInit {

 	text: string;
 	map: GoogleMap;

 	@Input('position') position: Coordinate;
 	@Input('origin') origin: Coordinate;   
 	@Input('destination') destination: Coordinate;


 	constructor(private platform: Platform) {
 		// this.platform.ready().then(()=>{
 		// 	this.loadMap();
 		// })
 	}

 	ngOnInit(){
 		this.initMap();	
 	}

 	initMap(){
 		
 		this.loadMap();

 		if (this.position) {
 			this.addMarker(this.position);
 		}

 		else{
 			this.addMarker(this.origin);
 			this.addMarker(this.destination);
 			this.traceRoute();
		 }


 	}

 	loadMap(){

 		let mapOptions: GoogleMapOptions = {
 			camera: {
 				target: {
 					lat: -18.8862074,
 					lng: 47.54780019999998
 				},
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
 			alert('map is ready')
 		})

 		let _marker: MarkerOptions = {
 			position: {
 					lat: -18.8862074,
 					lng: 47.54780019999998
 				},
 		}
 		this.map.addMarker(_marker)
 		.then((marker)=>{
 			alert('marker is added')
 		})
 	}

 	addMarker(position: Coordinate){



 		// let marker: Marker = this.map.addMarkerSync({
 		// 	title: 'Ionic',
 		// 	icon: 'blue',
 		// 	animation: 'DROP',
 		// 	position: position
 		// });

 		// marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
 		// 	alert('clicked');
 		// });

		 let _marker: MarkerOptions = {
			position: position,
		}
		this.map.addMarker(_marker)
		.then((marker)=>{
			alert('marker is added')
		})
 	}

 	traceRoute(){

 	}

 }