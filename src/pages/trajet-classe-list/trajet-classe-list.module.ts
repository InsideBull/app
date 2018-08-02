import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajetClasseListPage } from './trajet-classe-list';

@NgModule({
  declarations: [
    TrajetClasseListPage,
  ],
  imports: [
    IonicPageModule.forChild(TrajetClasseListPage),
  ],
})
export class TrajetClasseListPageModule {}
