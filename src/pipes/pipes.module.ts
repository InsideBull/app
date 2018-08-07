import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { SearchBookingClassPipe } from './search-booking-class/search-booking-class';
import { SearchCarPipe } from './search-car/search-car';
import { SearchTrajetPipe } from './search-trajet/search-trajet';
import { SearchWorkerPipe } from './search-worker/search-worker';
import { SearchVoyagePipe } from './search-voyage/search-voyage';
import { SearchPlanningPipe } from './search-planning/search-planning';

@NgModule({
	declarations: [SearchPipe,
    SearchBookingClassPipe,
    SearchCarPipe,
    SearchTrajetPipe,
    SearchWorkerPipe,
    SearchVoyagePipe,
    SearchPlanningPipe],
	imports: [],
	exports: [SearchPipe,
    SearchBookingClassPipe,
    SearchCarPipe,
    SearchTrajetPipe,
    SearchWorkerPipe,
    SearchVoyagePipe,
    SearchPlanningPipe]
})
export class PipesModule {}
