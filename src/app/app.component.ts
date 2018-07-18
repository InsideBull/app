import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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




@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = StationMenuPage;

  constructor(private facebookProvider: FacebookProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.facebookProvider.status().then((reponse)=>{
        if (reponse) {
          this.rootPage = ConnectedPage;
        }
      })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

