import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ListPage } from '../pages';
import { MineralService } from '../../providers/mineral-service';



@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
  providers: [ MineralService ]
})
export class MainMenuPage {
	minerals: any;

  constructor(private nav: NavController, public mineralService: MineralService) {}

  	gotoListView(){
  		this.nav.push(ListPage);
  	}

}
