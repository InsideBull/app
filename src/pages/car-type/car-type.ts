import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { CarType } from '../../models/car-type.model'
import { NotificationProvider } from '../../providers/notification/notification';
import { CarListPage } from '../car-list/car-list';
import { CarMenuPage } from '../car-menu/car-menu';
/**
 * Generated class for the CarTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-car-type',
 	templateUrl: 'car-type.html',
 })
 export class CarTypePage {

 	form: FormGroup;
 	seats = [];
 	nbRows = 0;
 	nbCols = 0;
 	rows: string[] = [];
 	cols: number[]  = [];
 	alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 	notavailable: string[] = [];
 	selected: string[] = [];
	 constructor(private cartypeProvider: CarTypeProvider, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
	public notif: NotificationProvider) {
 		this.form = this.formBuilder.group({
 			type: ['',Validators.required],			
 			nbRows: ['',Validators.required],			
 			nbCols: ['',Validators.required],			


 		});
 	}

 	ionViewWillEnter() {

 	}

 	getStatus = function(seatPos: string) {
		if(this.notavailable.indexOf(seatPos) !== -1) {
			return 'notavailable';
		} else if(this.selected.indexOf(seatPos) !== -1) {
			return 'selected';
		}
	}
    //clear handler
    clearSelected = function() {
    	this.selected = [];
    }
    //click handler
    seatClicked = function(seatPos: string) {
    	var index = this.selected.indexOf(seatPos);

    	if(index !== -1) {
            // seat already selected, remove
            this.selected.splice(index, 1)
        } else {
            //push to selected array only if it is not notavailable
            if(this.notavailable.indexOf(seatPos) === -1)
            	this.selected.push(seatPos);
        }
    }

    manageSeats(nbRows, nbCols){


    	this.rows = [];
    	let refRows = this.alpha.split('');
    	for( let i = 0; i < nbRows; i++){
    		this.rows.push(refRows[i]);
    	}
    	this.cols = [];
    	for (let j = 0; j < nbCols; ++j) {
    		this.cols.push(j);
    	}
    	for( let row in this.rows ){
    		for( let col in this.cols ){    			
    			let seat = this.rows[row] + col;
    			this.seats.push(seat);
    		}
    	}
    }

    onSubmit(){
		let message = "Voulez vous ajouter ce type de voiture ?";
		let title = "Ajout type de voiture";
		this.notif.presentConfirm(message, title).then(
			(confirm)=>{
				if(this.form.value){

					let value = this.form.value;
		
					value.nbplace = this.seats.length - this.notavailable.length;
		
					value.placelist = JSON.stringify(this.seats);
		
					value.notavailable = JSON.stringify(this.notavailable);
		
					let cartype = new CarType(value);
		
					this.cartypeProvider.save(cartype);

					this.navCtrl.push(CarMenuPage, {key: this.navParams.get('key')});
		
				}
			},()=>{});
    	
    }

 }
