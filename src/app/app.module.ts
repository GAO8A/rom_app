import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MainMenuPage, 
         MineralViewPage,
         ListPage,
         ListPopoverPage,
         MapPage,
         DetailViewPage} from '../pages/pages';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MineralService,
         WorldmapService } from '../providers/providers';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0b9d03fc'
  }
};

@NgModule({
  declarations: [
    MyApp,
    MainMenuPage,
    MineralViewPage,
    ListPage,
    ListPopoverPage,
    MapPage,
    DetailViewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
     CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainMenuPage,
    MineralViewPage,
    ListPage,
    ListPopoverPage,
    MapPage,
    DetailViewPage
  ],
  providers: [ MineralService, WorldmapService,
  {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
