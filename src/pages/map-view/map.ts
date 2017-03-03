import { Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { WorldmapService } from '../../providers/providers';
import { ConnectivityService } from '../../providers/providers';
import * as d3 from 'd3';
import { Geolocation } from 'ionic-native';

declare var google;
// in lieu of typings

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [ WorldmapService ]
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: string = "AIzaSyAGtDag-zU-Lfat_Lvcg2d_HtE2O8PO_EA";

  worldmapJson: any;
  selectedMineral: any;
  mineralLocalities: any;
  
  // casting to override typescript type error
  aa = [-122, 37] as any;
  bb = [-79, 43] as any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public worldmapService: WorldmapService,
              public loadingCtrl: LoadingController,
              public connectivityService: ConnectivityService) {
    
    this.selectedMineral = this.navParams.data;

    this.loadGoogleMaps();
         
 
  }



loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
 
    } 
  }
  else {
 
    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }
 
  }
 
  initMap(){
 
    this.mapInitialised = true;
 
    Geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    });
 
  }
 
  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }



}
