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
import { CarTypeProvider } from '../providers/car-type/car-type';
import { CarAddPage } from '../pages/car-add/car-add';
import { CarProvider } from '../providers/car/car';
import { CarDetailsPage } from '../pages/car-details/car-details';
import { Camera } from '@ionic-native/camera';
import { CameraProvider } from '../providers/camera/camera';
import { StationMenuPage } from '../pages/station-menu/station-menu';
import { StationCreatePage } from '../pages/station-create/station-create';
import { StationProvider } from '../providers/station/station';
import { StationListPage } from '../pages/station-list/station-list';
import { StationDetailPage } from '../pages/station-detail/station-detail';
import { VoyageParametersPage } from '../pages/voyage-parameters/voyage-parameters';
import { TripAffectPage } from '../pages/trip-affect/trip-affect';
import { TripProvider } from '../providers/trip/trip';
import { StationManagePage } from '../pages/station-manage/station-manage';
import { CarTypePage } from '../pages/car-type/car-type' ;
import { CarListPage } from '../pages/car-list/car-list';
import { CarEditPage } from '../pages/car-edit/car-edit';
import { TripListPage } from '../pages/trip-list/trip-list'
import { NotificationProvider } from '../providers/notification/notification';
import { GoogleMapsComponent } from '../components/google-maps/google-maps'
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapPage } from '../pages/map/map';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { WorkerProvider } from '../providers/worker/worker';
import { WorkerMenuPage } from '../pages/worker-menu/worker-menu';
import { WorkerAddPage } from '../pages/worker-add/worker-add';
import { WorkerListPage } from '../pages/worker-list/worker-list';
import { SplashPage } from '../pages/splash/splash';
import { ImageWidgetPage } from '../pages/image-widget/image-widget'
import { WorkerTypePage } from '../pages/worker-type/worker-type';
import { WorkerTypeProvider } from '../providers/worker-type/worker-type';
import { WorkerDetailPage } from '../pages/worker-detail/worker-detail';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { WorkersCarPage } from '../pages/workers-car/workers-car';
import { WorkersCarListPage } from '../pages/workers-car-list/workers-car-list';
import { WorkersCarAddPage } from '../pages/workers-car-add/workers-car-add';
import { WorkerEditPage } from '../pages/worker-edit/worker-edit';
import { PhoneProvider } from '../providers/phone/phone';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { EventProvider } from '../providers/event/event';
import { DeviceScannerPage } from '../pages/device-scanner/device-scanner';
import { CooperativeMenuPage } from '../pages/cooperative-menu/cooperative-menu'


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
  CarMenuPage,
  CarAddPage,
  CarDetailsPage,
  StationMenuPage,
  StationCreatePage,
  StationListPage,
  StationDetailPage,
  VoyageParametersPage,
  TripAffectPage,
  StationManagePage,
  CarTypePage,
  CarListPage,
  CarEditPage,
  TripListPage,
  GoogleMapsComponent,
  MapPage,
  WorkerMenuPage,
  WorkerAddPage,
  WorkerListPage,
  WorkerTypePage,
  SplashPage,
  ImageWidgetPage, 
  WorkerDetailPage,
  WorkersCarPage,
  WorkersCarListPage,
  WorkersCarAddPage,
  WorkerEditPage,
  DeviceScannerPage,
  CooperativeMenuPage

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
  CarMenuPage,
  CarAddPage,
  CarDetailsPage,
  StationMenuPage,
  StationCreatePage,
  StationMenuPage,StationListPage,
  StationDetailPage,
  VoyageParametersPage,
  TripAffectPage,
  StationManagePage,
  CarTypePage,CarListPage, 
  CarEditPage,
  TripListPage,
  GoogleMapsComponent,
  MapPage,
  WorkerMenuPage,
  WorkerAddPage,
  WorkerListPage,
  WorkerTypePage,
  SplashPage,
  ImageWidgetPage,
  SplashPage,
  ImageWidgetPage,
  WorkerDetailPage,
  WorkersCarPage,
  WorkersCarListPage,
  WorkersCarAddPage,
  WorkerEditPage,
  DeviceScannerPage,
  CooperativeMenuPage

  ],

  providers: [
  AndroidPermissions,
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
  CarTypeProvider,
  CarProvider,
  Camera,
  CameraProvider,
  StationProvider,
  TripProvider,
  NotificationProvider,
  GoogleMaps,
  ScreenOrientation,
  WorkerProvider,
  WorkerTypeProvider,
  PhoneProvider,
  CallNumber,
  SMS,
  EventProvider
  ]
})
export class AppModule {}
