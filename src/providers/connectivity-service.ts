import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }
 
  isOnline(): boolean {
    if(this.onDevice && Network.type === "none"){
      return false;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && Network.type === "none"){
      return true;
    } else {
      return !navigator.onLine;   
    }
  }
}