import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { WorldmapService } from '../../providers/providers';
import * as d3 from 'd3';

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

  worldmapJson: any;
  selectedMineral: any;
  mineralLocalities: any;
  
  // casting to override typescript type error
  aa = [-122, 37] as any;
  bb = [-79, 43] as any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public worldmapService: WorldmapService,
              public loadingCtrl: LoadingController) {
    
    this.selectedMineral = this.navParams.data;
         
 
  }

  parseLocations(){
    this.mineralLocalities = this.selectedMineral["Notable Localities"].split(';');
    console.log(this.selectedMineral);
    //console.log(this.mineralLocalities);

  }




  loadworldmap(){
      this.worldmapService.loadGeoJson().then(data=>{

        this.worldmapJson = data.features;
        this.createMap();
        //console.log("notable localities ", this.selectedMineral["Notable Localities"])
        this.parseLocations();

      }, (error) => {
        console.error(error);
      });   
  }

  addPoints(map,projection){



  }

  createMap(){

    let svg = d3.select("svg");

    let width = svg.property("width");
    let height = svg.property("height");

    let projection = d3.geoMercator();

    let path = d3.geoPath()
    .projection(projection);

    

    svg.selectAll("path")
       .data(this.worldmapJson)
       .enter().append("path")
       .attr("d", path);

    svg.selectAll("circle")
    .data([this.aa,this.bb]).enter()
    .append("circle")
    .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
    .attr("cy", function (d) { return projection(d)[1]; })
    .attr("r", "8px")
    .attr("fill", "red")
     
  }


  ionViewDidEnter(){
    
     this.loadworldmap();
   
   }



}
