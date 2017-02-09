import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WorldmapService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorldmapService {

  private geoJson: any;

  constructor(public http: Http) {
    console.log('Hello WorldmapService Provider');

  }

  // loadGeolocation() {
  //     if (this.data) {
  //         // already loaded data
  //         return Promise.resolve(this.data);
  //     }

  //     // don't have the data yet
  //     return new Promise(resolve => {
  //         this.http.get('../assets/geolocation.json').subscribe(res => {
  //             this.data = res.json();
  //             resolve(this.data);
  //             console.log(this.data);
  //         });
  //     });
  // }

    loadGeoJson() {
      if (this.geoJson) {
          // already loaded data
          return Promise.resolve(this.geoJson);
      }

      // don't have the data yet
      return new Promise(resolve => {
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.get('../assets/worldmap.json').subscribe(res => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              this.geoJson = res.json();
              resolve(this.geoJson);
              //console.log(this.data);
          });
      });
  }

}
