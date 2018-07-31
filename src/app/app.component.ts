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



 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = CooperativeListPage;

  // pages: Array<{title: string, component: any, param?: any, status: false}>;

  pages: any = [];

  constructor(public modalCrtl : ModalController, private screenOrientation: ScreenOrientation, private facebookProvider: FacebookProvider, platform: Platform, statusBar: StatusBar, public events: Events, public eventProvider: EventProvider) {
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.pages = [
      {title: 'Cooperative', component: CooperativeListPage,param:{}},
      {title: 'Station', component: StationMenuPage, param:{}}    
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

    this.eventProvider.getEvent('paramWorker').then((paramWorker)=>{
      if(paramWorker){
        this.pages.push({title: 'Menu Employé', component: WorkerMenuPage, param: paramWorker});
      }
    });

    this.eventProvider.getEvent('paramCar').then((paramCar)=>{
      if(paramCar){
        this.pages.push({title: 'Menu Voiture', component: WorkerMenuPage, param: paramCar});
      }
    });

    
  }

  ionViewDidLoad(){
    
  }

  onPage(page){
    this.nav.push(page.component, page.param);
  }
  
}

