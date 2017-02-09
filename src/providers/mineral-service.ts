import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Database } from '@ionic/cloud-angular';
import 'rxjs/add/operator/map';


/*
  Generated class for the MineralService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MineralService {

  constructor(public http: Http, public db: Database) {
    console.log('Hello MineralService Provider');
    this.db.connect()
  }

  public getMinerals(){
  	let store = this.db.collection('minerals');
  	return store.watch();
  }


  public getConnectionStatus(){
        return new Promise(resolve => {
            this.db.status().subscribe(status => resolve(status));
        });
    }

}
