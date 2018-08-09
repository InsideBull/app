import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
     selector: 'page-dashboard',
     templateUrl: 'dashboard.html',
 })
 export class DashboardPage {


     @ViewChild('barCanvas') barCanvas;

     barChart: any;
     key: string;
     labels = [];
     data = [];
     now = new Date(); 
     totalUnpaidReservation: number = 0;
     totalPaidReservation: number = 0;
     amountUnpaid: number = 0;
     amountPaid: number = 0;
     of: string ;
     months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ];
     month:string;
     selectedMonth = new Date().getMonth();

     constructor(
         public navCtrl: NavController,
         public navParams: NavParams,
         private cooperativeProvider: CooperativeProvider
         ) {
         this.key = this.navParams.get('key');
         
         this.getMonthReservation();      
     }

     ionViewDidLoad() {
     }

     showGraph(event){
           let selectedMonth = this.months.indexOf(event);
           this.selectedMonth = selectedMonth; 
           
           console.log(event,this.selectedMonth);

           this.getMonthReservation();          
     }

     getMonthReservation(){
         this.cooperativeProvider.fetch(this.key).then((cooperative)=>{
             this.labels = [];
             this.data = [];
             let plannigs = [];
             let dates = [];
             let count: number = 0;
             let currentMonth = this.selectedMonth;
             if ((currentMonth === 4) || (currentMonth === 7)) {
                 this.of = "d'";
             }
             else{
                 this.of = "de";
             }
             this.month = this.months[currentMonth];

             plannigs = cooperative['planning'];
             for(let p in plannigs){
                 for(let d in plannigs[p]){
                     for(let h in plannigs[p][d]){
                         for(let t in plannigs[p][d][h]){
                             for(let c in plannigs[p][d][h]){
                                 let reservations = plannigs[p][d][h][c]['reservation'];
                                 for(let r in reservations){
                                     for(let key in reservations[r]){
                                         if (reservations[r][key].date) {
                                             let date = reservations[r][key].date;
                                             let month = new Date(date).getMonth();
                                             if (currentMonth == month) {
                                                 let item = dates.find( value => value == date );
                                                 if (item) {
                                                     let nb = item.nb + reservations[r][key].nbplace;
                                                     dates[date] = nb;
                                                 }
                                                 else{
                                                     dates[date] = reservations[r][key].nbplace
                                                 }

                                                 if (reservations[r][key].status == "pending") {
                                                     this.totalUnpaidReservation += reservations[r][key].nbplace;
                                                     this.amountUnpaid += reservations[r][key].amount
                                                 }
                                                 else{
                                                     this.totalPaidReservation += reservations[r][key].nbplace;
                                                     this.amountPaid += reservations[r][key].amount
                                                 }                                                 
                                             }                                             
                                         }
                                     }
                                 }
                             }                       
                         }
                     }
                 }

             }            
             for(let key in dates){
                 this.labels.push(key);
                 this.labels = this.labels.sort();
             }

             for(let date in this.labels){
                 this.data.push(dates[this.labels[date]]);
             }            

             this.preparChart();            
         })
     }




     calculStepSize(){
         let maxValue = Math.max.apply(null,this.data);
         let step = Math.round(maxValue/10);
         return step;
     }



     preparChart(){
         this.barChart = new Chart(this.barCanvas.nativeElement, {

             type: 'bar',
             data: {
                 labels: this.labels,
                 datasets: [
                 {
                     label: "Nombre de réservation",
                     backgroundColor: "#ffdb83",
                     borderColor: "#f9cc0f",
                     borderWidth: 3, 
                     data: this.data,
                     spanGaps: false
                 }
                 ]
             },
             options: {
                 scales: {
                     yAxes: [{
                         ticks: {
                             beginAtZero:true,
                             stepSize: this.calculStepSize(),
                         },
                         scaleLabel: {
                             display: true,
                             labelString: "Nombre des places réservées",
                             fontColor: "#fc7390",
                             fontSize: 20
                         }
                     }],
                     xAxes: [{
                         scaleLabel: {
                             display: true,
                             labelString: "Date de réservation",
                             fontColor: "#fc7390",
                             fontSize: 20
                         }
                     }],

                 }
             }

         });
     }

 }
