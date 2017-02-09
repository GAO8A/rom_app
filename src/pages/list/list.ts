import { Component } from '@angular/core';

import { NavController, 
         NavParams, 
         LoadingController, 
         PopoverController } from 'ionic-angular';

import { MineralViewPage,
         ListPopoverPage } from '../pages';

import { MineralService } from '../../providers/providers';




@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ MineralService ]
})
export class ListPage {
  minerals: any;
  mineralList: Array <any> = []; //array of numbers for ng-if to iterate. eg. for 4 minerals, [1,2,3,4]
  searchList: any;
  selectedMineral: any;
  items: Array <{title: string, note: string, icon: string}>;
  viewMode: string = "list";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public mineralService: MineralService,  
              private loadingController: LoadingController,
              public popoverCtrl: PopoverController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedMineral = navParams.get('mineral');
  }

  loadDB(){
      this.mineralService.getMinerals().subscribe(data=>{

        this.minerals = data;
//change this to just data (no chunking) to get the list view

        if (this.viewMode === "list"){
          this.mineralList = data;
        } else if (this.viewMode === "gallery"){
          this.mineralList = this.chunk(3,data);
        }
        
        console.log("mineral list: ", this.mineralList);

      }, (error) => {
        console.error(error);
      });   
  }

  // Mineral 'chunking' for gallery view, build an array of subarrays that are the desired length of a row.
  chunk(size,arr){
        return [].concat.apply([],
            arr.map(function(elem,i) {
                return i%size ? [] : [arr.slice(i,i+size)];
            })
        );
  }

  //view options popover handler
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ListPopoverPage,{viewType:this.viewMode});
    popover.present({
      ev: myEvent
    });
  }  

  ionViewDidLoad(){

    // gallery view setup


    /// loader logic 
      let loader = this.loadingController.create({
        spinner: 'crescent',
        content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box"></div>
            Connecting to database...
          </div>`
      });     

     loader.present().then(() => {
      this.mineralService.getConnectionStatus().then(data => {

        let status = data;

        console.log("data from list.ts: ",status["type"]);
        if (status["type"]==="connected"){
         this.loadDB();
         loader.dismiss();
        } else  if (status["type"]!=="connected") {
          this.loadDB();
          //this.mineralService.db.connect();
        }

      });
    });

    }

  mineralTapped(event, mineral) {
    this.navCtrl.push(MineralViewPage, {
      mineral: mineral 
    });
  }

  getMinerals(ev: any) {
    // Reset items back to all of the items
    this.mineralList = this.minerals;
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.mineralList = this.minerals.filter((mineral) => {
        return (mineral.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
