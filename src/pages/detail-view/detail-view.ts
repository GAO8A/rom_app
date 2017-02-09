import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the DetailView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-view',
  templateUrl: 'detail-view.html'
})
export class DetailViewPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams){
  	 	this.selectedMineral = this.navParams.data;

  	}

  	selectedMineral: any;
  	images: Array<number> = [];
  	picLetter: Array<string> = ['','b','c','d'];
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailViewPage');

    let len = this.selectedMineral["Pics"];
    for(var i = 0; i<len; i++){
    	this.images.push(i);
    }
  }

}
