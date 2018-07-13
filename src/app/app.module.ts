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
import { ValidationPage } from '../pages/validation/validation';
import { Facebook } from '@ionic-native/facebook';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { CooperativeProvider } from '../providers/cooperative/cooperative';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AdministratorProvider } from '../providers/administrator/administrator';
import { QrcodeValidationProvider } from '../providers/qrcode-validation/qrcode-validation';
import { CooperativeDetailsPage } from '../pages/cooperative-details/cooperative-details';
import { CooperativeManagePage } from '../pages/cooperative-manage/cooperative-manage';
import { QrScannerPage } from '../pages/qr-scanner/qr-scanner';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { QRScanner } from '@ionic-native/qr-scanner';
import { QrScannerProvider } from '../providers/qr-scanner/qr-scanner';
import { VoyageCreatePage } from '../pages/voyage-create/voyage-create';
import { VoyageListPage } from '../pages/voyage-list/voyage-list';
import { VoyageDetailPage } from '../pages/voyage-detail/voyage-detail';
import { VoyageManagePage } from '../pages/voyage-manage/voyage-manage';
import { ParametersPage } from '../pages/parameters/parameters';
import { AdminListPage } from '../pages/admin-list/admin-list';
import { AdminAddPage } from '../pages/admin-add/admin-add';
import { VoyageMenuPage } from '../pages/voyage-menu/voyage-menu';
import { CarMenuPage } from '../pages/car-menu/car-menu';
import { VoyageProvider } from '../providers/voyage/voyage';
import { StationProvider } from '../providers/voyage/station';


@NgModule({
  declarations: [
  MyApp,
  HomePage,
  LoginPage,
  ConnectedPage,
  CooperativeCreatePage,
  CooperativeListPage,
  ValidationPage,
  CooperativeDetailsPage,
  CooperativeManagePage,
  QrScannerPage,
  ConfirmationPage,
  VoyageCreatePage,
  VoyageListPage,
  VoyageDetailPage,
  VoyageManagePage,
  ParametersPage,
  AdminListPage,
  AdminAddPage,
  VoyageMenuPage,
  CarMenuPage
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
  ValidationPage,
  CooperativeDetailsPage,
  CooperativeManagePage,
  QrScannerPage,
  ConfirmationPage,
  VoyageCreatePage,
  VoyageListPage,
  VoyageDetailPage,
  VoyageManagePage,
  ParametersPage,
  AdminListPage,
  AdminAddPage,
  VoyageMenuPage,
  CarMenuPage

  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    FacebookProvider,
    CooperativeProvider,
    AdministratorProvider,
    QrcodeValidationProvider,
    QRScanner,
    QrScannerProvider,
    VoyageProvider,
    StationProvider
  ]
})
export class AppModule {}
