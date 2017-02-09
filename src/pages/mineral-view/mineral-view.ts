import { Component} from '@angular/core';

import { NavController, 
         NavParams } from 'ionic-angular';

import { DetailViewPage,
         MapPage } from '../pages';

// import * as topojson from 'topojson';

@Component({
  selector: 'page-mineral-view',
  templateUrl: 'mineral-view.html'
})
export class MineralViewPage {

  detailViewTab = DetailViewPage;
  mapViewTab = MapPage;

  selectedMineral: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedMineral = navParams.get('mineral');


  }


}


