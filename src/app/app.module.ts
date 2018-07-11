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
import { ConnectedPage } from '../pages/connected/connected';
import { CooperativeCreatePage } from '../pages/cooperative-create/cooperative-create';
import { CooperativeListPage } from '../pages/cooperative-list/cooperative-list';
import { Facebook } from '@ionic-native/facebook';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { CooperativeProvider } from '../providers/cooperative/cooperative';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AdministratorProvider } from '../providers/administrator/administrator';
import { CooperativeDetailsPage } from '../pages/cooperative-details/cooperative-details';
import { CooperativeManagePage } from '../pages/cooperative-manage/cooperative-manage';

@NgModule({
  declarations: [
  MyApp,
  HomePage,
  LoginPage,
  ConnectedPage,
  CooperativeCreatePage,
  CooperativeListPage,
  CooperativeDetailsPage,
  CooperativeManagePage
  ],
  imports: [
  BrowserModule,
  AngularFireModule.initializeApp(FIREBASE_CONFIG),
  AngularFireDatabaseModule,
  AngularFireStorageModule,
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage,
  LoginPage,
  ConnectedPage,
  CooperativeCreatePage,
  CooperativeListPage,
  CooperativeDetailsPage,
  CooperativeManagePage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  Facebook,
  FacebookProvider,
  CooperativeProvider,
  AdministratorProvider
  ]
})
export class AppModule {}
