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
import { DeviceScannerPage } from '../pages/device-scanner/device-scanner'
import { TrajetProvider } from '../providers/trajet/trajet';
import { TrajetCreatePage } from '../pages/trajet-create/trajet-create';
import { TrajetMenuPage } from '../pages/trajet-menu/trajet-menu';
import { TrajetListPage } from '../pages/trajet-list/trajet-list';
import { TrajetDetailPage } from '../pages/trajet-detail/trajet-detail';
import { PriceTrajetProvider } from '../providers/price-trajet/price-trajet';
import { BookingClassProvider } from '../providers/booking-class/booking-class';
import { BookingClassTypeProvider } from '../providers/booking-class-type/booking-class-type';
import { BookingClassAddPage } from '../pages/booking-class-add/booking-class-add';
import { BookingClassDetailsPage } from '../pages/booking-class-details/booking-class-details';
import { BookingClassMenuPage } from '../pages/booking-class-menu/booking-class-menu';
import { BookingClassTypePage } from '../pages/booking-class-type/booking-class-type';
import { CooperativeMenuPage } from '../pages/cooperative-menu/cooperative-menu';
import { BookingClassEditPage } from '../pages/booking-class-edit/booking-class-edit';
import { TrajetParametersPage } from '../pages/trajet-parameters/trajet-parameters';
import { TrajetAffectPage } from '../pages/trajet-affect/trajet-affect';
import { BookingClassListePage } from '../pages/booking-class-liste/booking-class-liste';
import { TrajetClasseListPage } from '../pages/trajet-classe-list/trajet-classe-list';
import { TrajetEditPage } from '../pages/trajet-edit/trajet-edit';

import { PlanningCreatePage } from '../pages/planning-create/planning-create';
import { PlanningMenuPage } from '../pages/planning-menu/planning-menu';
import { PlanningListPage } from '../pages/planning-list/planning-list';
import { PlanningDetailsPage } from '../pages/planning-details/planning-details'
import { PlanningProvider } from '../providers/planning/planning';
import { SearchPipe } from '../pipes/search/search';
import { SearchBookingClassPipe } from '../pipes/search-booking-class/search-booking-class';
import { SearchCarPipe } from '../pipes/search-car/search-car';
import { SearchTrajetPipe } from '../pipes/search-trajet/search-trajet';
import { SearchWorkerPipe } from '../pipes/search-worker/search-worker';
import { SearchVoyagePipe } from '../pipes/search-voyage/search-voyage';
import { SearchPlanningPipe } from '../pipes/search-planning/search-planning';
import { PlanningEditPage } from '../pages/planning-edit/planning-edit';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PlanningParameterPage } from '../pages/planning-parameter/planning-parameter';
import { PlanningAffectCarPage } from '../pages/planning-affect-car/planning-affect-car';
import { PlanningAffectCarListPage } from '../pages/planning-affect-car-list/planning-affect-car-list';


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
  TrajetMenuPage,
  TrajetCreatePage,
  TrajetListPage,
  TrajetDetailPage,
  CooperativeMenuPage,
  TrajetParametersPage,
  TrajetAffectPage,
  BookingClassListePage,
  BookingClassAddPage,
  BookingClassDetailsPage,
  BookingClassMenuPage,
  BookingClassTypePage,  
  CooperativeMenuPage,
  BookingClassEditPage,
  PlanningCreatePage,
  PlanningMenuPage,
  PlanningListPage,
  PlanningDetailsPage,
  TrajetClasseListPage,
  TrajetEditPage,
  BookingClassEditPage,
  SearchPipe,
  SearchBookingClassPipe,
  SearchCarPipe,
  SearchTrajetPipe,
  SearchWorkerPipe,
  SearchVoyagePipe,
  SearchPlanningPipe,
  PlanningEditPage,
  DashboardPage,  
  PlanningParameterPage,
  PlanningAffectCarPage,
  PlanningAffectCarListPage
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
  CooperativeMenuPage,
  TrajetMenuPage,
  TrajetCreatePage,
  TrajetListPage,
  TrajetDetailPage,
  TrajetParametersPage,
  TrajetAffectPage,
  BookingClassListePage,
  BookingClassAddPage,
  BookingClassDetailsPage,
  BookingClassMenuPage,
  BookingClassTypePage,
  CooperativeMenuPage,
  BookingClassEditPage,
  PlanningCreatePage,
  PlanningMenuPage,
  PlanningListPage,
  PlanningDetailsPage,
  TrajetClasseListPage,
  TrajetEditPage,
  BookingClassEditPage,
  PlanningEditPage,
  DashboardPage,
  PlanningParameterPage,
  PlanningAffectCarPage,
  PlanningAffectCarListPage
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
  EventProvider,
  TrajetProvider,
  PriceTrajetProvider,
  BookingClassProvider,
  BookingClassTypeProvider,
    PlanningProvider
  ]
})
export class AppModule {}
