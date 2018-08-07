import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ConnectedPage } from '../pages/connected/connected';
import { LoginPage } from '../pages/login/login';
import { CooperativeCreatePage } from '../pages/cooperative-create/cooperative-create';
import { FacebookProvider } from '../providers/facebook/facebook';
import { CooperativeListPage } from '../pages/cooperative-list/cooperative-list';
import { CooperativeDetailsPage } from '../pages/cooperative-details/cooperative-details';
import { VoyageListPage } from '../pages/voyage-list/voyage-list';
import { VoyageCreatePage } from '../pages/voyage-create/voyage-create';
import { StationMenuPage } from '../pages/station-menu/station-menu';
import { StationListPage } from '../pages/station-list/station-list';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SplashPage } from '../pages/splash/splash';
import { ModalController, MenuController } from 'ionic-angular';
import { StationCreatePage } from '../pages/station-create/station-create';
import { WorkerMenuPage } from '../pages/worker-menu/worker-menu';
import { CarMenuPage } from '../pages/car-menu/car-menu';
import { EventProvider } from '../providers/event/event';
import { VoyageMenuPage } from '../pages/voyage-menu/voyage-menu';
import { BookingClassMenuPage } from '../pages/booking-class-menu/booking-class-menu';
import { BookingClassAddPage } from '../pages/booking-class-add/booking-class-add';

import { DeviceScannerPage } from '../pages/device-scanner/device-scanner';
import { CooperativeMenuPage } from '../pages/cooperative-menu/cooperative-menu';
import { TrajetMenuPage } from '../pages/trajet-menu/trajet-menu';
import { PlanningMenuPage } from '../pages/planning-menu/planning-menu';




 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = CooperativeMenuPage;


  // pages: Array<{title: string, component: any, param?: any, status: false}>;

  pages: any = [];
  name: any;

  constructor(public modalCrtl : ModalController, private screenOrientation: ScreenOrientation, private facebookProvider: FacebookProvider, platform: Platform, statusBar: StatusBar, public events: Events, public eventProvider: EventProvider) {
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.pages = [
      {title: 'Menu Station', component: StationMenuPage, param:{}},    
      {title: 'Profil', component: ConnectedPage, param:{}},  
    ]

    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.facebookProvider.status().then((reponse)=>{
        if (reponse) {
          this.rootPage = ConnectedPage;
        }
      }) 
      
      statusBar.styleDefault();
      let splash = modalCrtl.create(SplashPage) ;
      splash.present() ;
    });

    // this.eventProvider.getEvent('parmCoopDetail').then((resolve)=>{
    //   if(resolve){
    //     this.name = resolve['name'];
    //     this.pages.push({title: this.name, component: CooperativeDetailsPage, param: resolve});
    //   }
    // });
    this.eventProvider.getEvent('paramWorker').then((paramWorker)=>{
      if(paramWorker){
        this.pages.push({title: 'Menu Employé', component: WorkerMenuPage, param: paramWorker});
      }
    });

    this.eventProvider.getEvent('paramCar').then((paramCar)=>{
      if(paramCar){
        this.pages.push({title: 'Menu Voiture', component: CarMenuPage, param: paramCar});
      }
    });

    this.eventProvider.getEvent('uid').then((resolve)=>{
      if(resolve){
        this.pages.push({title: 'Mes coopératives', component: CooperativeListPage, param: resolve});
      }
    });

    this.eventProvider.getEvent('parmVoyageMenu').then((resolve)=>{
      if(resolve){
        this.pages.push({title: "Menu voyage", component: VoyageMenuPage, param: resolve});
      }
    });
    this.eventProvider.getEvent('parmTrajetMenu').then((resolve)=>{
      if(resolve){
        this.pages.push({title: "Menu Trajet", component: TrajetMenuPage, param: resolve});
      }
    });
    this.eventProvider.getEvent('parmPlannigMenu').then((resolve)=>{
      if(resolve){
        this.pages.push({title: "Menu Planification", component: PlanningMenuPage, param: resolve});
      }
    });

    
  }

  ionViewDidLoad(){
    
  }

  onPage(page){
    this.nav.setRoot(page.component, page.param);
  }
  
}

