import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ConnectedPage } from '../pages/connected/connected';
import { LoginPage } from '../pages/login/login';
import { CooperativeCreatePage } from '../pages/cooperative-create/cooperative-create';
import { FacebookProvider } from '../providers/facebook/facebook';
import { CooperativeListPage } from '../pages/cooperative-list/cooperative-list';
import { CooperativeDetailsPage } from '../pages/cooperative-details/cooperative-details';
import { StationMenuPage } from '../pages/station-menu/station-menu';
import { StationListPage } from '../pages/station-list/station-list';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SplashPage } from '../pages/splash/splash';
import { ModalController, MenuController } from 'ionic-angular';
import { StationCreatePage } from '../pages/station-create/station-create';
import { WorkerMenuPage } from '../pages/worker-menu/worker-menu';
import { CarMenuPage } from '../pages/car-menu/car-menu';
import { EventProvider } from '../providers/event/event';
import { BookingClassMenuPage } from '../pages/booking-class-menu/booking-class-menu';
import { BookingClassAddPage } from '../pages/booking-class-add/booking-class-add';
import { DeviceScannerPage } from '../pages/device-scanner/device-scanner';
import { CooperativeMenuPage } from '../pages/cooperative-menu/cooperative-menu';
import { TrajetMenuPage } from '../pages/trajet-menu/trajet-menu';
import { PlanningMenuPage } from '../pages/planning-menu/planning-menu';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { NotificationProvider } from '../providers/notification/notification';

 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = CooperativeMenuPage;

  pages: any = [];
  name: any;
  platform: any;

  constructor(public modalCrtl : ModalController, private screenOrientation: ScreenOrientation, private facebookProvider: FacebookProvider, platform: Platform, statusBar: StatusBar, public events: Events, public eventProvider: EventProvider, public notif: NotificationProvider) {
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.platform = platform;

    this.pages = [
      {title: 'Profil', component: ConnectedPage, param:{}},  
      {title: 'Station', component: StationMenuPage, param:{}}   
    ]

    
    
    platform.ready().then(() => {
      
      this.facebookProvider.status().then((reponse)=>{
        if (reponse) {
          this.rootPage = ConnectedPage;
        }
      }) 
      
      statusBar.styleDefault();
      let splash = modalCrtl.create(SplashPage) ;
      splash.present() ;
    });

    this.eventProvider.getEvent('paramWorker').then((paramWorker)=>{
      if(paramWorker){
        this.pages.push({title: 'Employés', component: WorkerMenuPage, param: paramWorker});
      }
    });

    this.eventProvider.getEvent('paramCar').then((paramCar)=>{
      if(paramCar){
        this.pages.push({title: 'Voitures', component: CarMenuPage, param: paramCar});
      }
    });

    this.eventProvider.getEvent('uid').then((resolve)=>{
      if(resolve){
        this.pages.push({title: 'Mes coopératives', component: CooperativeListPage, param: resolve});
      }
    });

    this.eventProvider.getEvent('parmTrajetMenu').then((resolve)=>{
      if(resolve){
        this.pages.push({title: "Trajets", component: TrajetMenuPage, param: resolve});
      }
    });
    this.eventProvider.getEvent('parmPlannigMenu').then((resolve)=>{
      if(resolve){
        this.pages.push({title: "Planifications", component: PlanningMenuPage, param: resolve});
      }
    });

    
  }

  ionViewDidLoad(){
    
  }

  onPage(page){
    this.nav.push(page.component, page.param);
  }

  exitApp(){
    let message = "Voulez-vous quitter l'application ?";
    let title = "Quitter";
    this.notif.presentConfirm(message, title).then((confirm)=>{
      this.platform.exitApp();
    },()=>{});
  }
  logout(){
    let message = "Voulez-vouz vraimment se déconnecter ?";
    let title = "Déconnexion";
    this.notif.presentConfirm(message, title).then((confirm)=>{
      this.facebookProvider.logout();
      this.nav.setRoot(LoginPage);
    },()=>{});
  }
}

