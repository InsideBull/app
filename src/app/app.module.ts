import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { MyApp } from './app.component';
import { FacebookProvider } from '../providers/facebook/facebook';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
  MyApp,
  HomePage,
  LoginPage
  ],
  imports: [
  BrowserModule,
  AngularFireModule.initializeApp(FIREBASE_CONFIG),
  AngularFireDatabaseModule,
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage,
  LoginPage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  Facebook,
  FacebookProvider
  ]
})
export class AppModule {}
