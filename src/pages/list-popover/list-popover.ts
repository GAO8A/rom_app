import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


/*
  Generated class for the ListPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-popover',
  templateUrl: 'list-popover.html'
})
export class ListPopoverPage {

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams
              ) {}

  viewType : string;


  ionViewDidLoad() {
    if(this.navParams.data){
      this.viewType = this.navParams.data.viewType;
    }
    console.log('ionViewDidLoad ListPopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  toggleMode(viewMode){
    this.viewType = viewMode;
    console.log(this.viewType);
    this.close();

  }

}
